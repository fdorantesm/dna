import { registerAs } from '@nestjs/config';
import { DnaConfigType } from './dna.type';

export const dnaConfig = registerAs(
  'dna',
  (): DnaConfigType => ({
    chars: [...(process.env.DNA_CHARS || 'ACGT')],
    thresholds: {
      charsCount:
        parseInt(process.env.DNA_MUTATION_THRESHOLD_CHARS_COUNT, 10) || 4,
      sequenceLength:
        parseInt(process.env.DNA_MUTATION_THRESHOLD_SEQUENCE_LENGTH, 10) || 2,
    },
  }),
);
