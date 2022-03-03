import { ConfigModuleOptions } from '@nestjs/config';

import { configLoader } from './loader';
import { configSchema } from './schemas/config.schema';

export const configOptions: ConfigModuleOptions = {
  cache: true,
  isGlobal: true,
  load: [configLoader],
  validationSchema: Object.assign(configSchema),
  validationOptions: {
    allowUnknown: true,
    abortEarly: true,
  },
};
