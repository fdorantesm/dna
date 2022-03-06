import { registerAs } from '@nestjs/config';
import { DnaConfigType } from './dna.type';

export default registerAs(
  'dna',
  (): DnaConfigType => ({
    chars: [...(process.env.DNA_CHARS || '')],
    thresholds: {
      charsCount: parseInt(process.env.DNA_MUTATION_THRESHOLD_CHARS_COUNT, 10),
      sequenceLength: parseInt(
        process.env.DNA_MUTATION_THRESHOLD_SEQUENCE_LENGTH,
        10,
      ),
    },
  }),
);
