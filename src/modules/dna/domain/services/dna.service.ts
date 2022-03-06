import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { Json } from '../../../../app/types/json.type';
import { DnaConfigType } from '../../application/config/dna.type';
import { CreateDnaDto } from '../../infrastructure/database/dtos/create-dna.dto';
import { DnaRepository } from '../../infrastructure/database/repositories/dna.repository';
import { DnaEntity } from '../entities/dna.entity';
import { DnaServiceHelper } from '../helpers/dna.helper';

@Injectable()
export class DnaService {
  constructor(
    private readonly dnaServiceHelper: DnaServiceHelper,
    private readonly configService: ConfigService,
    private readonly dnaRepository: DnaRepository,
  ) {}

  public createDna(dna: CreateDnaDto): Promise<DnaEntity> {
    return this.dnaRepository.create(dna);
  }

  public lookupMutations(dna: string[]) {
    this.isValidTable(dna);
    const config = this.configService.get<DnaConfigType>('dna');

    const rowMutations = this.dnaServiceHelper.getMutations(
      dna,
      config.chars,
      config.thresholds.charsCount,
    );

    const columns = this.dnaServiceHelper.getTopToBottom(dna);
    const columnsMutations = this.dnaServiceHelper.getMutations(
      columns,
      config.chars,
      config.thresholds.charsCount,
    );

    const obliquesLtr = this.dnaServiceHelper.getDiagonals(dna);
    const obliquesLtrMutations = this.dnaServiceHelper.getMutations(
      obliquesLtr,
      config.chars,
      config.thresholds.charsCount,
    );

    const tableReversed = this.dnaServiceHelper.reverseColumns(dna);

    const obliquesRtl = this.dnaServiceHelper.getDiagonals(tableReversed);
    const obliquesRtlMutations = this.dnaServiceHelper.getMutations(
      obliquesRtl,
      config.chars,
      config.thresholds.charsCount,
    );

    return {
      leftToRight: rowMutations,
      topToBottom: columnsMutations,
      topRightToBottomLeft: obliquesLtrMutations,
      bottomRightToTopLeft: obliquesRtlMutations,
    };
  }

  public stats(): Json {
    return {
      count_mutations: 40,
      count_no_mutation: 100,
      ratio: 0.4,
    };
  }

  private isValidTable(table: string[]): void {
    const isValid = this.dnaServiceHelper.isValidTable(table);
    if (!isValid) {
      throw new Error('Table has not NxN size');
    }
  }
}
