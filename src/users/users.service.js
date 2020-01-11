import { Injectable, Dependencies, Logger } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import UsersException from './users.exception';
import { ConfirmationsService } from '../confirmations/confirmations.service';
import { ConfigService } from '@nestjs/config';
import { MailerService } from '@nest-modules/mailer';

@Injectable()
@Dependencies(ConfigService, getModelToken('User'), ConfirmationsService, MailerService)
export class UsersService {
  constructor(configService, userModel, confirmationsService, mailerService) {
    this.logger = new Logger(UsersService.name);
    this.configService = configService;
    this.userModel = userModel;
    this.confirmationsService = confirmationsService;
    this.mailerService = mailerService;
  }

  async create(user, confirmationIsNeeded) {
    if (await this.findOneByEmail(user.email)) {
      throw new UsersException('EMAIL_ALREADY_REGISTERED');
    }
    if (await this.findOneByName(user.name)) {
      throw new UsersException('NAME_ALREADY_TAKEN');
    }
    const createdUser = new this.userModel(user);
    await createdUser.save();
    
    if (confirmationIsNeeded && this.configService.get('users.sendRegistrationConfirmation')) {
      const confirmationExpireTime = this.configService.get('users.registrationConfirmationExpireTime');
      const confirmation = await this.confirmationsService.create(createdUser, 'registration', confirmationExpireTime);
      try {
        await this.mailerService.sendMail({
          to: createdUser.email,
          from: 'noreply@kysune.me',
          subject: 'Registration',
          template: 'user-registration',
          context: {
            token: confirmation.token,
            username: createdUser.name,
          },
        });
      } catch (error) {
        this.logger.error(error.message);
      }
    }

    return createdUser;
  }

  async resendRegistrationConfirmation(user) {
    if (!this.configService.get('users.sendRegistrationConfirmation')) {
      throw new UsersException('REGISTRATION_CONFIRMATIONS_DISABLED');
    }
    const confirmationExpireTime = this.configService.get('users.registrationConfirmationExpireTime');
    const confirmation = await this.confirmationsService.create(user, 'registration', confirmationExpireTime);
    this.confirmationsService.send(confirmation, 'email', user.email);
  }

  async findOneById(id) {
    return this.userModel.findById(id);
  }

  async findOneByLogin(login) {
    let user;
    if (login.indexOf('@') > -1) {
      user = this.userModel.findOne({
        email: login,
      });
    } else {
      user = this.userModel.findOne({
        name: login,
      });
    }
    return user;
  }

  async findOneByName(name) {
    return this.userModel.findOne({
      name,
    });
  }

  async findOneByEmail(email) {
    return this.userModel.findOne({
      email,
    });
  }

  async confirmRegistration(user) {
    user.registrationConfirmedAt = Date.now();
    await user.save();
  }

  // async findByLogins(logins: Array<string>): Promise<Array<User>> {
  //   const emails = [];
  //   const names = [];
  //   logins.forEach((login) => {
  //     if (login.indexOf('@') > -1) {
  //       emails.push(login);
  //     } else {
  //       names.push(login);
  //     }
  //   });
  //   return this.userModel.find({
  //     $or: {
  //       name: {
  //         $in: names,
  //       },
  //       email: {
  //         $in: emails,
  //       },
  //     },
  //   });
  // }

  onModuleInit () {
    this.confirmationsService.on('confirmed#registration', (event) => {
      this.confirmRegistration(event.confirmation.user);
    });
  }
}
