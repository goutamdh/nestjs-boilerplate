import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { HandlebarsAdapter, MailerModule } from '@nest-modules/mailer';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TotpModule } from './totp/totp.module';
import { CacheModule } from './cache';
import { ConfirmationsModule } from './confirmations/confirmations.module';
import configuration from './config';
import SparkPostTransport from 'nodemailer-sparkpost-transport';
import { MailerHandlebarsAdapter } from './helpers/MailerHandlebarsAdapter'

@Module({
  imports: [
    UsersModule,
    AuthModule,
    TotpModule,
    ConfirmationsModule,

    MongooseModule.forRoot('mongodb://127.0.0.1/nest', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    }),
    
    CacheModule.forRoot({
      dialect: 'redis',
      host: '127.0.0.1',
      port: 0,
      db: 0,
      prefix: '',
    }),
    
    ConfigModule.forRoot({
      isGlobal: true,
      load: configuration,
    }),
    
    MailerModule.forRoot({
      transport: SparkPostTransport({
        sparkPostApiKey: '4f11976410a2c0b5c9b32014027142b8bb92b27f',
        endpoint: 'https://api.eu.sparkpost.com',
      }),
      defaults: {
        from:'"Szymon Lisowiec" <noreply@kysune.me>',
      },
      template: {
        adapter: new MailerHandlebarsAdapter({
          templateDir: `${__dirname}/email-templates`,
          strict: true,
          context: {
            title: 'Default e-mail title',
            domain: 'localhost',
            footerText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            termsOfServiceUrl: 'https://localhost#tos',
            privacyPolicyUrl: 'https://localhost#tos',
          },
        }),
      },
    }),
  ],
  providers: [
    AppService,
  ],
})
export class AppModule {}
