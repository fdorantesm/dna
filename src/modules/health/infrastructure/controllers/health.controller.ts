import { Controller, Get, HttpCode, VERSION_NEUTRAL } from '@nestjs/common';

import { HealthService } from '../../application/services/health.service';

@Controller({
  version: VERSION_NEUTRAL,
  path: '/health',
})
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Get('/')
  @HttpCode(204)
  public health(): void {
    return this.healthService.health();
  }
}
