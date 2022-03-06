import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { Logger, ValidationPipe } from '@nestjs/common';
import * as volleyball from 'volleyball';

import { AppModule } from './app/app.module';
import { ServerConfiguration } from './core/config/server/server.type';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService: ConfigService = app.get(ConfigService);
  const config = configService.get<ServerConfiguration>('server');

  const { host, port } = config;

  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  app.enableVersioning();
  app.use(volleyball);

  app.listen(port || process.env.PORT, host, () => {
    Logger.log(`Server ready on http://${host}:${port}`, 'Application');
  });
}
bootstrap();
