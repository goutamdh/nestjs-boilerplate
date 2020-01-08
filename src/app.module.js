import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { CacheModule } from './cache';
import { ConfirmationsModule } from './confirmations/confirmations.module';
import { ConfigModule } from '@nestjs/config';
import configuration from './config';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    ConfirmationsModule,
    MongooseModule.forRoot('mongodb://127.0.0.1/nest', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
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
  ],
  providers: [
    AppService,
  ],
})
export class AppModule {}
