import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { serverConfig } from 'src/core/config/server/config';
import { ServerConfiguration } from 'src/core/config/server/server.type';
import { HealthService } from './application/services/health.service';

import { HealthController } from './infrastructure/controllers/health.controller';

@Module({
  imports: [
    HttpModule.registerAsync({
      imports: [ConfigModule.forFeature(serverConfig)],
      inject: [ConfigService],
      useFactory(configService: ConfigService) {
        const config = configService.get<ServerConfiguration>('server');
        return {
          baseURL: `http://${config.host}:${config.port}`,
        };
      },
    }),
  ],
  controllers: [HealthController],
  providers: [HealthService],
})
export class HealthModule {}
