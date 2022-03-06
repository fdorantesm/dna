import { ConfigModuleOptions } from '@nestjs/config';
import * as Joi from 'joi';

import dnaSchema from '../../modules/dna/application/config/dna.schema';
import serverSchema from './server/server.schema';
import serverConfig from './server/config';
import databaseSchema from './database/database.schema';

export const configOptions: ConfigModuleOptions = {
  cache: true,
  isGlobal: true,
  load: [serverConfig],
  validationSchema: Object.assign(Joi.object(), {
    ...databaseSchema,
    ...serverSchema,
    ...dnaSchema,
  }),
  validationOptions: {
    allowUnknown: true,
    abortEarly: true,
  },
};
