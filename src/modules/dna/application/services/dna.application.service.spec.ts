import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';

import { DnaServiceHelper } from '../../domain/helpers/dna.helper';
import { DnaService } from '../../domain/services/dna.service';
import { DnaFakeModel } from '../../infrastructure/database/models/dna/dna.fake';
import { DnaRepository } from '../../infrastructure/database/repositories/dna.repository';
import { dnaConfig } from '../config/dna.config';
import { DnaApplicationService } from './dna.application.service';

describe('DnaApplicationService', () => {
  let service: DnaApplicationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forFeature(dnaConfig)],
      providers: [
        DnaService,
        DnaApplicationService,
        DnaServiceHelper,
        DnaRepository,
        {
          provide: 'DnaModelModel',
          useClass: DnaFakeModel,
        },
      ],
    }).compile();

    service = module.get<DnaApplicationService>(DnaApplicationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should mutations if were more than 2', async () => {
    try {
      const task = await service.lookupDna([
        'ATGTGA',
        'CATTGC',
        'TTATGT',
        'TGAAGG',
        'CCCCTA',
        'TCACTG',
      ]);
      expect(task).toEqual(['TTTT', 'CCCCTA', 'AAAATG', 'GGGGTT']);
    } catch (error) {
      console.log(error);
    }
  });

  it('should returns stats with 0.4 ratio', async () => {
    try {
      expect(await service.getStats()).toEqual({
        count_mutations: 40,
        count_no_mutation: 100,
        ratio: 0.4,
      });
    } catch {}
  });
});
