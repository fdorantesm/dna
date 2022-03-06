import { Injectable } from '@nestjs/common';
import { FilterQuery } from 'mongoose';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const uuidApikey = require('uuid-apikey');

import { ApiKeyEntity } from '../infraestructure/database/apikeys/apikey.entity';
import { ApiKeyModel } from '../infraestructure/database/apikeys/apikey.model';
import { ApiKeyRepository } from '../infraestructure/database/apikeys/apikey.repository';

@Injectable()
export class ApiKeyService {
  constructor(private readonly apiKeyRepository: ApiKeyRepository) {}

  public toUUID(uuid: string) {
    return uuidApikey.toUUID(uuid);
  }

  public check(apiKey: string, uuid: string) {
    return uuidApikey.check(apiKey, uuid);
  }

  public find(filter: FilterQuery<ApiKeyModel>): Promise<ApiKeyEntity> {
    return this.apiKeyRepository.findOne(filter);
  }
}
