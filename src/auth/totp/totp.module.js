import { Module } from '@nestjs/common';
import { TotpController } from './totp.controller';
import { TotpService } from './totp.service';
import { UsersModule } from '../../users/users.module';

@Module({
  imports: [UsersModule],
  providers: [TotpService],
  controllers: [TotpController],
})
export class TotpModule {}
