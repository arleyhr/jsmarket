/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);

  if (process.env.NODE_ENV !== 'production') {
    app.enableCors();
    Logger.log('CORS habilitado en desarrollo');
  }

  const port = process.env.PORT || 3333;
  await app.listen(port);
  Logger.log(
    `🚀 Aplicación corriendo en: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
