import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as dotenv from 'dotenv';
import * as fs from 'fs';

async function bootstrap() {
  dotenv.config();

  const web14 = '/etc/ssl/web14.key';
  const STAR = '/etc/ssl/STAR_bucaramanga_upb_edu_co.crt';

  if (fs.existsSync(web14) && fs.existsSync(STAR)) {
    // El archivo existe, ahora puedes abrirlo.
    const httpsOptions = {
      key: fs.readFileSync(web14 , 'utf8'),
      cert: fs.readFileSync(STAR, 'utf8'),
    };
    const app = await NestFactory.create(AppModule, {
      httpsOptions,});
      app.enableCors({
        allowedHeaders: '*',
        origin: 'https://20fisi.bucaramanga.upb.edu.co/',
        credentials: false, 
      });
      app.setGlobalPrefix('api');
      app.useGlobalPipes(new ValidationPipe())
      const configService = app.get(ConfigService)
      await app.listen(configService.get('PORT'));
    // Continúa con el procesamiento del archivo.
  } else {
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

  

  
} 
 
bootstrap();  


