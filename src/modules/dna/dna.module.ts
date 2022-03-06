import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import dnaConfig from './application/config/dna.loader';
import { DnaApplicationService } from './application/services/dna.application.service';
import { DnaServiceHelper } from './domain/helpers/dna.helper';
import { DnaService } from './domain/services/dna.service';
import { DnaController } from './infrastructure/http/controllers/dna.controller';

@Module({
  imports: [ConfigModule.forFeature(dnaConfig)],
  providers: [DnaApplicationService, DnaService, DnaServiceHelper],
  controllers: [DnaController],
})
export class DnaModule {}
