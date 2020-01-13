import { Injectable, BadRequestException, Dependencies, Inject } from '@nestjs/common';
import Validator from 'validatorjs';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ValidationInterceptor {
  constructor(schema, dataType) {
    this.schema = schema;
    this.dataType = dataType;
  }
  intercept(context, next) {
    const request = context.switchToHttp().getRequest();
    const validation = new Validator(request[this.dataType || 'body'], this.schema, request.getCatalog(request.locale).validator || {});
    if (validation.fails()) {
      throw new BadRequestException(validation.errors.all());
    }
    return next.handle();
  }
}
