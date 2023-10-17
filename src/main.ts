import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as dotenv from 'dotenv';
import * as fs from 'fs';

async function bootstrap() {
  dotenv.config();

  const httpsOptions = {
    key: fs.readFileSync('./etc/ssl/web14.key' , 'utf8'),
    cert: fs.readFileSync('./etc/ssl/STAR_bucaramanga_upb_edu_co.crt', 'utf8'),
  };

  
  const app = await NestFactory.create(AppModule, {
    httpsOptions,});

  
  // const app = await NestFactory.create(AppModule);
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


