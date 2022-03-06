import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import dnaLoader from '../../application/config/dna.loader';

import { DnaServiceHelper } from './dna.helper';

describe('DnaServiceHelper', () => {
  let service: DnaServiceHelper;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forFeature(dnaLoader)],
      providers: [DnaServiceHelper],
    }).compile();

    service = module.get<DnaServiceHelper>(DnaServiceHelper);
    service.getMutation = service.getMutation.bind({
      config: {
        chars: ['A', 'C', 'G', 'T'],
        thresholds: {
          charsCount: 4,
        },
      },
    });
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should returns reversed table', () => {
    const table = ['123', '456', '789'];
    const reversed = ['321', '654', '987'];
    expect(service.reverseColumns(table)).toEqual(reversed);
  });

  it('should returns top left diagonals from table', () => {
    const table = ['ATGTGA', 'CATTGC', 'TTATGT', 'TGAAGG', 'CCCCTA', 'TCACTG'];
    const diagonals = [
      'AAAATG',
      'TTTGA',
      'CTACT',
      'GTGG',
      'TGCC',
      'TGT',
      'TCA',
      'GC',
      'CC',
    ];
    expect(service.getDiagonals(table)).toEqual(diagonals);
  });

  it('should returns sequence of sequence of repeated characters', () => {
    expect(service.getMutation('CCCCTA', ['C', 'T'], 4)).toBe('CCCC');
  });

  it('should returns null instead of repeated characters', () => {
    expect(service.getMutation('AAACCC', ['A', 'C'], 4)).toBeNull();
  });

  it('should returns an array of charecters sequences', () => {
    const table = ['AAAA', 'CACA', 'ACCA', 'CCCA'];
    const matches = ['AAAA'];
    expect(service.getMutations(table, ['A', 'C'], 4)).toEqual(matches);
  });

  it('should passes if is table were a nxn size', () => {
    expect(service.isValidTable(['FIAT', 'ACDC', 'COKE', 'NIKE'])).toBeTruthy();
  });

  it('should fails if table were not a nxn size', () => {
    expect(service.isValidTable(['LP', 'ACDC', 'GNR'])).toBeFalsy();
  });

  it('should returns table coulumns', () => {
    const input = ['FIAT', 'ACDC', 'COKE', 'NIKE'];
    const outout = ['FACN', 'ICOI', 'ADKK', 'TCEE'];
    expect(service.getTopToBottom(input)).toEqual(outout);
  });
});
