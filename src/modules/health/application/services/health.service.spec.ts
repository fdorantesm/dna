import { HttpService } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';
import { HealthService } from './health.service';

describe('HealthService', () => {
  let service: HealthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HealthService,
        {
          provide: HttpService,
          useValue: {
            get(_path: string) {
              return Promise.resolve();
            },
          },
        },
      ],
    }).compile();

    service = module.get<HealthService>(HealthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be void', () => {
    expect(service.health()).toBe(undefined);
  });

  it('should be void', () => {
    expect(service.daemon()).resolves.toBe(undefined);
  });
});
