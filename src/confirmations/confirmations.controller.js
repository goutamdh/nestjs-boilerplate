import { Controller, Put, Body, Dependencies, Bind } from '@nestjs/common';
import { ConfirmationsService } from './confirmations.service';

@Controller('confirmations')
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
