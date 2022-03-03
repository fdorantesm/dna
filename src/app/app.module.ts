import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { HealthModule } from '../modules/health/health.module';
import { DnaModule } from '../modules/dna/dna.module';
import { configOptions } from './config';

@Module({
  imports: [ConfigModule.forRoot(configOptions), HealthModule, DnaModule],
})
export class AppModule {}
