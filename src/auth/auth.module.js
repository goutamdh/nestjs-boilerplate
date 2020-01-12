import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { TotpModule } from '../totp/totp.module';
import { LocalStrategy } from './strategies/local.strategy';
import { TokenStrategy } from './strategies/bearer.strategy';

@Module({
  imports: [
    UsersModule,
    PassportModule.register({ defaultStrategy: 'bearer' }),
    TotpModule,
  ],
  providers: [AuthService, LocalStrategy, TokenStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
