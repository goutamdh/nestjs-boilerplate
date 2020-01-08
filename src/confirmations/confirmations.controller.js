import { Controller, Put, Body, Dependencies, Bind, UseFilters } from '@nestjs/common';
import { ConfirmationsExceptionFilter } from './confirmations-exception.filter';
import { ConfirmationsService } from './confirmations.service';

@Controller('confirmations')
@UseFilters(ConfirmationsExceptionFilter)
@Dependencies(ConfirmationsService)
export class ConfirmationsController {
  constructor(confirmationsService) {
    this.confirmationsService = confirmationsService;
  }

  @Put('confirm')
  @Bind(Body())
  async create ({ token }) {
    await this.confirmationsService.confirm(token);
    return {};
  }

}
