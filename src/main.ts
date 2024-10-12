import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    snapshot: true,
  });

  // Swagger setup
  const config = new DocumentBuilder()
    .setTitle('Website Visit Tracker')
    .setDescription('API for tracking website visits by country')
    .setVersion('1.0')
    .addTag('visits')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Validation setup
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
}
bootstrap();
