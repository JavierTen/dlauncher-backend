import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as dotenv from 'dotenv';

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService)

  app.enableCors({
    allowedHeaders: '*',
    origin: '*',
    credentials: false,
  });
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe())
  await app.listen(configService.get('PORT'));
} 
 
bootstrap();  


