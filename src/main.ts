import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { Logger, ValidationPipe } from '@nestjs/common';
import * as volleyball from 'volleyball';
import helmet from 'helmet';
import expressRateLimit from 'express-rate-limit';

import { AppModule } from './app/app.module';
import { ServerConfiguration } from './core/config/server/server.type';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService: ConfigService = app.get(ConfigService);
  const config = configService.get<ServerConfiguration>('server');

  const { host, port, rateLimit } = config;

  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  app.enableVersioning();
  app.use(volleyball);
  app.use(helmet());
  app.use(
    expressRateLimit({
      windowMs: rateLimit.interval,
      max: rateLimit.maxRequest,
      standardHeaders: true,
      legacyHeaders: false,
    }),
  );

  const documentBuilder = new DocumentBuilder();
  documentBuilder.setTitle('API Docs');
  documentBuilder.setVersion('1.0.0');

  documentBuilder.addApiKey(
    {
      description: 'Api Key',
      bearerFormat: 'ApiKey XXXXXXX-XXXXXXX-XXXXXXX-XXXXXXX',
      type: 'apiKey',
    },
    'Authorization',
  );

  const document = SwaggerModule.createDocument(app, documentBuilder.build());
  SwaggerModule.setup('docs', app, document);

  app.listen(port, host, () => {
    Logger.log(`Server ready on http://${host}:${port}`, 'Application');
  });
}

bootstrap();
