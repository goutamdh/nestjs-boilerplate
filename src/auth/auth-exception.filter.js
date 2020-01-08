import { Catch, HttpException, HttpStatus, Inject } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import AuthException from './auth.exception';

@Catch(AuthException)
export class AuthExceptionFilter extends BaseExceptionFilter {
  catch(exception, host) {
    console.log(111);
    switch (exception.message) {
      case 'EMAIL_ALREADY_REGISTERED':
        super.catch(new HttpException('E-mail has already been registered', HttpStatus.BAD_REQUEST), host);
        break;
        
      case 'NAME_ALREADY_TAKEN':
        super.catch(new HttpException('Username has already been taken.', HttpStatus.BAD_REQUEST), host);
        break;

      default:
        super.catch(new HttpException('Unknown', HttpStatus.BAD_REQUEST), host);
    }
  }
}
