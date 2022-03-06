import { SchemaFactory } from '@nestjs/mongoose';

import { DnaModel } from './dna.model';

export const DnaSchema = SchemaFactory.createForClass(DnaModel);
