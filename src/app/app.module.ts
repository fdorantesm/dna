import { Module } from '@nestjs/common';
import { DnaModule } from '../modules/dna/dna.module';

@Module({
  imports: [DnaModule],
})
export class AppModule {}
