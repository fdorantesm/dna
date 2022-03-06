import { Module } from '@nestjs/common';

import { HealthModule } from '../modules/health/health.module';
import { DnaModule } from '../modules/dna/dna.module';
import { CoreModule } from 'src/core/core.module';

@Module({
  imports: [CoreModule, HealthModule, DnaModule],
})
export class AppModule {}
