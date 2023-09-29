import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe, VersioningType } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  // Cấu hình Version Api
  app.setGlobalPrefix('api');
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  // Cấu hình Swagger
  const config = new DocumentBuilder()
    .setTitle('All apis example')
    .setDescription('The all apis API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  // Cấu hình Validation Global
  app.useGlobalPipes(new ValidationPipe({ whitelist: false }));
  await app.listen(3000);
}
bootstrap();
