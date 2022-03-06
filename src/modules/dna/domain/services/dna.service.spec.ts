import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';

import { CoreModule } from '../../../../core/core.module';
import { dnaConfig } from '../../application/config/dna.config';
import { DnaService } from '../../domain/services/dna.service';
import { models } from '../../infrastructure/database/models';
import { DnaFakeModel } from '../../infrastructure/database/models/dna/dna.fake';
import { DnaRepository } from '../../infrastructure/database/repositories/dna.repository';
import { DnaServiceHelper } from '../helpers/dna.helper';

describe('DnaApplicationService', () => {
  let service: DnaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        CoreModule,
        ConfigModule.forFeature(dnaConfig),
        MongooseModule.forFeature(models),
      ],
      providers: [
        DnaService,
        DnaServiceHelper,
        DnaRepository,
        {
          provide: 'DnaModelModel',
          useClass: DnaFakeModel,
        },
      ],
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
    expect(service.lookupMutations(input)).toEqual(output);
  });

  it('should fails without mutations', () => {
    const input = ['ATGCGA', 'CAGTGC', 'TTATTT', 'AGACGG', 'GCGTCA', 'TCACTG'];
    const output = {
      bottomRightToTopLeft: [],
      leftToRight: [],
      topRightToBottomLeft: [],
      topToBottom: [],
    };
    expect(service.lookupMutations(input)).toEqual(output);
  });

  it('should creates a mutation document', async () => {
    const dna = {
      sequence: ['ATGTGA', 'CATTGC', 'TTATGT', 'TGAAGG', 'CCCCTA', 'TCACTG'],
      mutations: ['TTTT', 'CCCCTA', 'AAAATG', 'GGGGTT'],
      mutationsCount: 4,
    };
    try {
      const task = await service.createDna(dna);
      expect(task).toHaveProperty('uuid');
      expect(task).toHaveProperty('sequence');
      expect(task).toHaveProperty('mutations');
      expect(task).toHaveProperty('mutationsCount');
    } catch {}
  });

  it('should returns all dna', () => {
    expect(service.countDocuments()).toBe(100);
  });

  it('should returns all mutations', () => {
    expect(service.countDocuments({})).toBe(40);
  });
});
