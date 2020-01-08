import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfirmationSchema } from '../schemas/confirmation.schema';
import { ConfirmationsService } from './confirmations.service';
import { ConfirmationsController } from './confirmations.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Confirmation', schema: ConfirmationSchema }]),
  ],
  controllers: [
    ConfirmationsController,
  ],
  providers: [
    ConfirmationsService,
  ],
  exports: [
    ConfirmationsService,
  ],
})
export class ConfirmationsModule {};
