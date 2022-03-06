import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';

import { DnaServiceHelper } from '../../domain/helpers/dna.helper';
import { DnaService } from '../../domain/services/dna.service';
import dnaLoader from '../config/dna.loader';
import { DnaApplicationService } from './dna.application.service';

describe('DnaApplicationService', () => {
  let service: DnaApplicationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forFeature(dnaLoader)],
      providers: [DnaService, DnaApplicationService, DnaServiceHelper],
    }).compile();

    service = module.get<DnaApplicationService>(DnaApplicationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should mutations if were more than 2', () => {
    expect(
      service.createDnaMutation([
        'ATGTGA',
        'CATTGC',
        'TTATGT',
        'TGAAGG',
        'CCCCTA',
        'TCACTG',
      ]),
    ).toEqual(['TTTT', 'CCCCTA', 'AAAATG', 'GGGGTT']);
  });
});
