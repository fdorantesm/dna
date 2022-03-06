import { Injectable } from '@nestjs/common';
import { DnaService } from '../../domain/services/dna.service';

@Injectable()
export class DnaApplicationService {
  constructor(private readonly dnaService: DnaService) {}

  public createDnaMutation(dna: string[]) {
    const {
      bottomRightToTopLeft,
      leftToRight,
      topRightToBottomLeft,
      topToBottom,
    } = this.dnaService.findMutations(dna);

    const mutations = [].concat(
      bottomRightToTopLeft,
      leftToRight,
      topRightToBottomLeft,
      topToBottom,
    );

    if (mutations.length < 2) {
      throw new Error('DNA sequence has not mutations');
    }

    return mutations;
  }

  public getStats() {
    return this.dnaService.stats();
  }
}
