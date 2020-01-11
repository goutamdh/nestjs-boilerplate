import { Controller, Dependencies, UseGuards, Post, Request, Body, Put, Bind, UseFilters } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TotpService } from './totp.service';
import { TotpExceptionFilter } from './totp-exception.filter';

@Controller('totp')
@UseFilters(TotpExceptionFilter)
@Dependencies(TotpService)
export class TotpController {
  constructor (totpService) {
    this.totpService = totpService;
  }

  @UseGuards(AuthGuard('bearer'))
  @Post('generate')
  @Bind(Request())
  async generate({ user }) {
    return await this.totpService.generate(user);
  }

  @UseGuards(AuthGuard('bearer'))
  @Put('enable')
  @Bind(Request(), Body())
  async enable({ user }, { token }) {
    await this.totpService.enable(user, token);
    return {};
  }

  @UseGuards(AuthGuard('bearer'))
  @Put('disableWithToken')
  @Bind(Request(), Body())
  async disableWithToken({ user }, { token }) {
    await this.totpService.disableWithToken(user, token);
    return {};
  }
  
  @Put('disableWithBackupCode')
  @Bind(Request(), Body())
  async disableWithBackupCode({ user }, { code }) {
    await this.totpService.disableWithBackupCode(user, code);
    return {};
  }
  
}
