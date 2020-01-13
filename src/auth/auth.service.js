import { Injectable, Dependencies, HttpException, HttpStatus, BadRequestException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as Argon2 from 'argon2';
import * as Crypto from 'crypto';
import { CacheManager } from '../cache';
import { ConfigService } from '@nestjs/config';
import { TotpService } from '../totp/totp.service';

@Injectable()
@Dependencies(UsersService, ConfigService, TotpService, CacheManager)
export class AuthService {

  constructor(usersService, configService, totpService, cache) {
    this.usersService = usersService;
    this.configService = configService;
    this.totpService = totpService;
    this.cache = cache;
  }

  async validateUser (login, password) {
    const user = await this.usersService.findOneByLogin(login);
    if (user && await this.verifyPassword(user.password, password)) {
      return user;
    }
    return null;
  }
  
  async validateAccessToken (accessToken) {
    const accessTokenPayload = JSON.parse(await this.cache.get(accessToken));
    if (accessTokenPayload) {
      const user = await this.usersService.findOneById(accessTokenPayload.userId);
      return user || null;
    }
    return null;
  }

  async login (user, { totp }) { // TODO: Add limit for failed attempts
    if (this.configService.get('auth.needsConfirmedRegistrationToLogin') && !user.registrationConfirmedAt) {
      throw new BadRequestException('First you have to confirm registration. Check your e-mail inbox.');
    }
    if (user.totp && user.totp.isActive) {
      if (!totp) {
        throw new BadRequestException('You have to provide code from authenticatior.');
      }
      if (!await this.totpService.verify(user.totp.key, totp, user.totp)) {
        throw new BadRequestException('Your authenticatior\'s code is wrong.');
      }
    }
    const expireTime = 3600;
    const accessTokenLength = 64;
    const accessToken = await this.generateAccessToken(accessTokenLength);
    await this.cache.set(accessToken, JSON.stringify({
      userId: user.id,
    }), {
      expire: expireTime,
    });
    return {
      accessToken,
      expiresAt: Math.floor(Date.now() / 1000) + expireTime,
    };
  }

  async register (request, payload) { // TODO: Registrations limit from one IP address.
    await this.usersService.create(payload, true);
    return {};
  }

  generateAccessToken (length) {
    return new Promise((resolve, reject) => {
      Crypto.randomBytes(length, (error, bytes) => {
        if (error) {
          return reject(error);
        }
        resolve(bytes.toString('base64'));
      });
    });
  }

  async verifyPassword (hashedPassword, password) {
    try {
      return await Argon2.verify(hashedPassword, password);
    } catch (error) {
      console.log(error);
      throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
