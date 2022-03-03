import { Module } from '@nestjs/common';
import { DnaApplicationService } from './application/services/dna.application.service';
import { DnaController } from './infrastructure/http/controllers/dna.controller';

@Module({
  providers: [DnaApplicationService],
  controllers: [DnaController],
})
export class DnaModule {}
