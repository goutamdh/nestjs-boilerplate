import { Catch, HttpException, HttpStatus, Inject } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import TotpException from './totp.exception';

@Catch(TotpException)
export class TotpExceptionFilter extends BaseExceptionFilter {
  catch(exception, host) {
    switch (exception.message) {
      case 'CANNOT_GENERATE_TOTP':
        super.catch(new HttpException('Cannot generate totp.', HttpStatus.BAD_REQUEST), host);
        break;
        
      case 'CANNOT_ENABLE_TOTP':
        super.catch(new HttpException('Cannot enable totp.', HttpStatus.BAD_REQUEST), host);
        break;

      case 'CANNOT_DISABLE_TOTP':
        super.catch(new HttpException('Cannot disable totp.', HttpStatus.BAD_REQUEST), host);
        break;
        
      case 'CANNOT_VERIFY_TOTP':
        super.catch(new HttpException('Cannot verify totp.', HttpStatus.BAD_REQUEST), host);
        break;

      case 'WRONG_BACKUP_CODE':
        super.catch(new HttpException('Given backup code not matching.', HttpStatus.BAD_REQUEST), host);
        break;

      default:
        super.catch(new HttpException('Unknown', HttpStatus.BAD_REQUEST), host);
    }
  }
}
