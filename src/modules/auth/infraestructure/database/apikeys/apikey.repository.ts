import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';

import { ApiKeyEntity } from './apikey.entity';
import { ApiKeyModel } from './apikey.model';

@Injectable()
export class ApiKeyRepository {
  constructor(
    @InjectModel(ApiKeyModel.name)
    private readonly apiKeyModel: Model<ApiKeyModel>,
  ) {}

  public async findOne(
    filter: FilterQuery<ApiKeyModel>,
  ): Promise<ApiKeyEntity> {
    const key = await this.apiKeyModel.findOne(filter).exec();
    return {
      uuid: key.uuid,
      publicKey: key.publicKey,
    };
  }
}
