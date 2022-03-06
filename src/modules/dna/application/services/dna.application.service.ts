import { Injectable } from '@nestjs/common';

import { Json } from '../../../../app/types/json.type';
import { DnaService } from '../../domain/services/dna.service';

@Injectable()
export class DnaApplicationService {
  constructor(private readonly dnaService: DnaService) {}

  public async createDnaMutation(dna: string[]) {
    const {
      bottomRightToTopLeft,
      leftToRight,
      topRightToBottomLeft,
      topToBottom,
    } = this.dnaService.lookupMutations(dna);

    const mutations = [].concat(
      bottomRightToTopLeft,
      leftToRight,
      topRightToBottomLeft,
      topToBottom,
    );

    await this.dnaService.createDna({
      mutations: mutations,
      mutationsCount: mutations.length,
      sequence: dna,
    });

    if (mutations.length < 2) {
      throw new Error('DNA sequence has not mutations');
    }

    return mutations;
  }

  public getStats(): Json {
    return this.dnaService.stats();
  }
}
