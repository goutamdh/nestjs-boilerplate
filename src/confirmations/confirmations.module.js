import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfirmationSchema } from '../schemas/confirmation.schema';
import { ConfirmationsService } from './confirmations.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Confirmation', schema: ConfirmationSchema }]),
  ],
  providers: [
    ConfirmationsService,
  ],
})
export class ConfirmationsModule {};
