import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { CacheModule } from './cache';

@Module({
  imports: [
    UsersModule,
    AuthModule,
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
  ],
  controllers: [AppController],
  providers: [
    AppService,
  ],
})
export class AppModule {}
