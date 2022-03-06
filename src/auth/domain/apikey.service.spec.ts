import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';

import { CoreModule } from '../../core/core.module';
import { AuthService } from '../application/services/auth.service';
import { ApiKeyFakeModel } from '../infraestructure/database/apikeys/apikey.fake';
import { ApiKeyModel } from '../infraestructure/database/apikeys/apikey.model';
import { ApiKeyRepository } from '../infraestructure/database/apikeys/apikey.repository';
import { models } from '../infraestructure/database/models';
import { ApiKeyService } from './apikey.service';

describe('ApiKeyService', () => {
  let service: ApiKeyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CoreModule, MongooseModule.forFeature(models)],
      providers: [
        AuthService,
        ApiKeyService,
        ApiKeyRepository,
        {
          provide: ApiKeyModel.name,
          useClass: ApiKeyFakeModel,
        },
      ],
    }).compile();

    service = module.get<ApiKeyService>(ApiKeyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should pass matching uuid vs key', () => {
    expect(
      service.check(
        '45CC4CR-J3844Y8-P5A9HSY-NHW3N9G',
        '2158c233-90d0-4279-b154-98e7ac783aa6',
      ),
    ).toBeTruthy();
  });

  it('should fails matching uuid vs key', () => {
    expect(
      service.check(
        'KCXC9JD-08M4WGH-M9294W1-B6RTBTH',
        'd0a6e498-748c-41d6-b4df-914eb188259f',
      ),
    ).toBeFalsy();
  });
});
