import * as Joi from 'joi';

export const databaseSchema = Joi.object({
  DB_HOST: Joi.string().hostname(),
  DB_PORT: Joi.number().port(),
  DB_USERNAME: Joi.string().when('DB_AUTH_MECHANISM', {
    is: Joi.exist() && Joi.equal('PLAIN'),
    then: Joi.required(),
    otherwise: Joi.optional(),
  }),
  DB_PASSWORD: Joi.string().when('DB_AUTH_MECHANISM', {
    is: Joi.exist() && Joi.equal('PLAIN'),
    then: Joi.required(),
    otherwise: Joi.optional(),
  }),
  DB_DATABASE: Joi.string().required(),
  DB_AUTH_MECHANISM: Joi.string().optional(),
});
