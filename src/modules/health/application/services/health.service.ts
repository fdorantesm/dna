import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';

import { serverConfig } from '../../../../core/application/config/server/config';

@Injectable()
export class HealthService {
  constructor(private readonly httpService: HttpService) {}
  public health(): void {
    Logger.log('HealthCheck', HealthService.name);
  }

  @Cron(serverConfig().daemon)
  public async daemon(): Promise<void> {
    try {
      await this.httpService.get('/health');
    } catch (error) {
      Logger.error(error, HealthService.name);
    } finally {
      Logger.debug('Server daemon', HealthService.name);
    }
  }
}
