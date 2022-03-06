import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { ForbiddenException } from '@nestjs/common';

import dnaLoader from '../../../application/config/dna.config';
import { DnaService } from '../../../domain/services/dna.service';
import { DnaApplicationService } from '../../../application/services/dna.application.service';
import { DnaServiceHelper } from '../../../domain/helpers/dna.helper';
import { DnaController } from './dna.controller';

describe('DnaController', () => {
  let controller: DnaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forFeature(dnaLoader)],
      controllers: [DnaController],
      providers: [DnaService, DnaApplicationService, DnaServiceHelper],
    }).compile();

    controller = module.get<DnaController>(DnaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should returns an array of mutations', () => {
    expect(
      controller.createDnaMutation({
        dna: ['ATGTGA', 'CATTGC', 'TTATGT', 'TGAAGG', 'CCCCTA', 'TCACTG'],
      }),
    ).toEqual(['TTTT', 'CCCCTA', 'AAAATG', 'GGGGTT']);
  });

  it('should fails', () => {
    try {
      controller.createDnaMutation({
        dna: ['ATGCGA', 'CAGTGC', 'TTATTT', 'AGACGG', 'GCGTCA', 'TCACTG'],
      });
    } catch (error) {
      expect(error.response.statusCode).toBe(403);
      expect(error.response.error).toBe('Forbidden');
      expect(error).toEqual(
        new ForbiddenException('DNA sequence has not mutations'),
      );
    }
  });
});
