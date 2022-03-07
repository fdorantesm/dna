import { Module } from '@nestjs/common';

import { HealthModule } from '../modules/health/health.module';
import { DnaModule } from '../modules/dna/dna.module';
import { CoreModule } from '../core/core.module';
import { AuthModule } from 'src/modules/auth/auth.module';

@Module({
  imports: [AuthModule, CoreModule, HealthModule, DnaModule],
})
export class AppModule {}
