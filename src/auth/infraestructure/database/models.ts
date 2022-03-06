import { ApiKeyModel } from './apikeys/apikey.model';
import { ApiKeySchema } from './apikeys/apikey.schema';

export const models = [
  {
    name: ApiKeyModel.name,
    schema: ApiKeySchema,
  },
];
