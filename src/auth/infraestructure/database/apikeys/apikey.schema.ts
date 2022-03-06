import { SchemaFactory } from '@nestjs/mongoose';

import { ApiKeyModel } from './apikey.model';

export const ApiKeySchema = SchemaFactory.createForClass(ApiKeyModel);
