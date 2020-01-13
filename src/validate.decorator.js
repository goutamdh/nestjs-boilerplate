import { applyDecorators, UsePipes, Request, UseInterceptors } from '@nestjs/common';
import { ValidationInterceptor } from './validate.interceptor';

export function ValidateBody(schema) {
  return applyDecorators(
    UseInterceptors(new ValidationInterceptor(schema, 'body'))
  );
}

export function ValidateParams(schema) {
  return applyDecorators(
    UseInterceptors(new ValidationInterceptor(schema, 'params'))
  );
}

export function ValidateQuery(schema) {
  return applyDecorators(
    UseInterceptors(new ValidationInterceptor(schema, 'query'))
  );
}
