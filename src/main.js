import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { FastifyAdapter } from '@nestjs/platform-fastify';
import i18nMiddleware from './i18n.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, FastifyAdapter);
  app.use(i18nMiddleware);
  await app.listen(3000);
}
bootstrap();
