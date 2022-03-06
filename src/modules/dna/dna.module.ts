import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { DnaApplicationService } from './application/services/dna.application.service';
import { DnaServiceHelper } from './domain/helpers/dna.helper';
import { DnaService } from './domain/services/dna.service';
import { DnaRepository } from './infrastructure/database/repositories/dna.repository';
import { DnaController } from './infrastructure/http/controllers/dna.controller';
import { dnaConfig } from './application/config/dna.config';
import { models } from './infrastructure/database/models';

@Module({
  imports: [
    ConfigModule.forFeature(dnaConfig),
    MongooseModule.forFeature(models),
  ],
  providers: [
    DnaRepository,
    DnaApplicationService,
    DnaService,
    DnaServiceHelper,
  ],
  controllers: [DnaController],
})
export class DnaModule {}
