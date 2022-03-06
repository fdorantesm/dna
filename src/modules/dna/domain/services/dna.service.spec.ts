import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';

import dnaLoader from '../../application/config/dna.config';
import { DnaService } from '../../domain/services/dna.service';
import { DnaServiceHelper } from '../helpers/dna.helper';

describe('DnaApplicationService', () => {
  let service: DnaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forFeature(dnaLoader)],
      providers: [DnaService, DnaServiceHelper],
    }).compile();

    service = module.get<DnaService>(DnaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should returns mutations by lines', () => {
    const input = ['ATGTGA', 'CATTGC', 'TTATGT', 'TGAAGG', 'CCCCTA', 'TCACTG'];
    const output = {
      bottomRightToTopLeft: ['TTTT'],
      leftToRight: ['CCCCTA'],
      topRightToBottomLeft: ['AAAATG'],
      topToBottom: ['GGGGTT'],
    };
    expect(service.findMutations(input)).toEqual(output);
  });

  it('should fails without mutations', () => {
    const input = ['ATGCGA', 'CAGTGC', 'TTATTT', 'AGACGG', 'GCGTCA', 'TCACTG'];
    const output = {
      bottomRightToTopLeft: [],
      leftToRight: [],
      topRightToBottomLeft: [],
      topToBottom: [],
    };
    expect(service.findMutations(input)).toEqual(output);
  });

  it('should returns stats', () => {
    expect(service.stats()).toEqual({
      count_mutations: 40,
      count_no_mutation: 100,
      ratio: 0.4,
    });
  });
});
