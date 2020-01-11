import { Catch, HttpException, HttpStatus } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import UsersException from './users.exception';

@Catch(UsersException)
export class UsersExceptionFilter extends BaseExceptionFilter {
  catch(exception, host) {
    switch (exception.message) {
      
      default:
        super.catch(new HttpException('Unknown', HttpStatus.BAD_REQUEST), host);
    }
  }
}
