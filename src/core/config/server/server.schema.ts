import * as Joi from 'joi';

export default Joi.object({
  HOST: Joi.string().default('localhost'),
  PORT: Joi.number().required(),
});
