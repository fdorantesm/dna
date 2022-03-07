import * as Joi from 'joi';

export const serverSchema = Joi.object({
  HOST: Joi.string().default('localhost'),
  PORT: Joi.number().required(),
  RATE_MAX_REQUEST: Joi.number(),
  RATE_INTERVAL: Joi.number(),
  DAEMON: Joi.string(),
});
