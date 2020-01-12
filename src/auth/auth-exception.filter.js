import { Catch, HttpException, HttpStatus } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import AuthException from './auth.exception';

@Catch(AuthException)
export class AuthExceptionFilter extends BaseExceptionFilter {
  catch(exception, host) {
    switch (exception.message) {
      case 'EMAIL_ALREADY_REGISTERED':
        super.catch(new HttpException('E-mail has already been registered', HttpStatus.BAD_REQUEST), host);
        break;
        
      case 'NAME_ALREADY_TAKEN':
        super.catch(new HttpException('Username has already been taken.', HttpStatus.BAD_REQUEST), host);
        break;

      case 'REGISTRATION_CONFIRMATION_NEEDED':
        super.catch(new HttpException('First you have to confirm registration. Check your e-mail inbox.', HttpStatus.BAD_REQUEST), host);
        break;

      case 'TOTP_TOKEN_REQUIRED':
        super.catch(new HttpException('You have to provide code from authenticatior.', HttpStatus.BAD_REQUEST), host);
        break;

      case 'TOTP_FAILED_VERIFICATION':
        super.catch(new HttpException('Your authenticatior\'s code is wrong.', HttpStatus.BAD_REQUEST), host);
        break;

      default:
        super.catch(new HttpException('Unknown', HttpStatus.BAD_REQUEST), host);
    }
  }
}
