import { Strategy } from 'passport-http-bearer';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, Dependencies, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
@Dependencies(AuthService)
export class TokenStrategy extends PassportStrategy(Strategy) {

  constructor(authService) {
    super();
    this.authService = authService;
  }

  async validate(accessToken) {
    const user = await this.authService.validateAccessToken(accessToken);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
