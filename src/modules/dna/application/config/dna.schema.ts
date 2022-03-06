import * as Joi from 'joi';

export const dnaSchema = Joi.object({
  DNA_CHARS: Joi.string().required(),
  DNA_MUTATION_THRESHOLD_CHARS_COUNT: Joi.number().required(),
  DNA_MUTATION_THRESHOLD_SEQUENCE_LENGTH: Joi.number().required(),
});
