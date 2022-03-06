import * as Joi from 'joi';

export const serverSchema = Joi.object({
  HOST: Joi.string().default('localhost'),
  PORT: Joi.number().required(),
});
