import { Catch, HttpException, HttpStatus } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import ConfirmationsException from './confirmations.exception';

@Catch(ConfirmationsException)
export class ConfirmationsExceptionFilter extends BaseExceptionFilter {
  catch(exception, host) {
    switch (exception.message) {
      case 'CONFIRMATION_NOT_FOUND':
        super.catch(new HttpException('Confirmation not exists.', HttpStatus.BAD_REQUEST), host);
        break;

      default:
        super.catch(new HttpException('Unknown', HttpStatus.BAD_REQUEST), host);
    }
  }
}
