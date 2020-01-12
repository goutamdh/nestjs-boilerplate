import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { MailerModule } from '@nest-modules/mailer';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TotpModule } from './totp/totp.module';
import { CacheModule } from './cache';
import { ConfirmationsModule } from './confirmations/confirmations.module';
import configuration from './config';
import { MailerHandlebarsAdapter } from './helpers/MailerHandlebarsAdapter'

@Module({
  imports: [
    UsersModule,
    AuthModule,
    TotpModule,
    ConfirmationsModule,
    
    ConfigModule.forRoot({
      isGlobal: true,
      load: configuration,
    }),

    MongooseModule.forRootAsync({
      useFactory: (configService) => configService.get('database'),
      inject: [ConfigService],
    }),
    
    CacheModule.forRootAsync({
      useFactory: (configService) => configService.get('cache'),
      inject: [ConfigService],
    }),
    
    MailerModule.forRootAsync({
      useFactory: (configService) => ({
        transport: configService.get('mailer.transport'),
        defaults: configService.get('mailer.defaults'),
        template: {
          adapter: new MailerHandlebarsAdapter(configService.get('mailer.template', {})),
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [
    AppService,
  ],
})
export class AppModule {}
