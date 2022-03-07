import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { ApiKeyService } from 'src/modules/auth/domain/apikey.service';
import { ApiKeyFakeModel } from 'src/modules/auth/infraestructure/database/apikeys/apikey.fake';
import { ApiKeyModel } from 'src/modules/auth/infraestructure/database/apikeys/apikey.model';
import { ApiKeyRepository } from 'src/modules/auth/infraestructure/database/apikeys/apikey.repository';
import { models } from 'src/modules/auth/infraestructure/database/models';
import { CoreModule } from 'src/core/core.module';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

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

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should pass api key validation', async () => {
    try {
      await service.validateUser('4JZSGTP-93JMXA9-PJWJVJ3-431J89D');
    } catch (error) {
      expect(error.response.message).toBe('Invalid API Key');
      expect(error.response.statusCode).toBe(401);
      expect(error.response.error).toBe('Unauthorized');
    }
  });

  it('should pass api key validation', async () => {
    const task = await service.validateUser('XA4022N-KS64V2A-HMSY7S4-BW45EPW');
    expect(task).toHaveProperty('uuid');
    expect(task).toHaveProperty('publicKey');
  });
});
