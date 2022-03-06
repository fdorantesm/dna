import { PartialType, OmitType } from '@nestjs/swagger';

import { DnaEntity } from '../../../../../modules/dna/domain/entities/dna.entity';

export class CreateDnaDto extends PartialType(
  OmitType(DnaEntity, ['uuid'] as const),
) {}
