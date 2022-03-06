import { ConfigModuleOptions } from '@nestjs/config';
import * as Joi from 'joi';

import { configLoader } from './loader';
import configSchema from './schemas/config.schema';
import dnaSchema from '../../modules/dna/application/config/dna.schema';

export const configOptions: ConfigModuleOptions = {
  cache: true,
  load: [configLoader],
  validationSchema: Object.assign(Joi.object(), {
    ...configSchema,
    ...dnaSchema,
  }),
  validationOptions: {
    allowUnknown: true,
    abortEarly: true,
  },
};
