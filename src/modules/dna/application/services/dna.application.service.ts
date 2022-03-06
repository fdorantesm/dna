import { HttpException, Injectable } from '@nestjs/common';

import { Json } from '../../../../app/types/json.type';
import { DnaService } from '../../domain/services/dna.service';

@Injectable()
export class DnaApplicationService {
  constructor(private readonly dnaService: DnaService) {}

  public async lookupDna(dna: string[]) {
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
      throw new HttpException('DNA sequence has not mutations', 403);
    }

    return mutations;
  }

  public async getStats(): Promise<Json> {
    const all = await this.dnaService.countDocuments();
    const mutated = await this.dnaService.countDocuments({
      mutationsCount: {
        $gte: 2,
      },
    });
    return {
      count_mutations: mutated,
      count_no_mutation: all,
      ratio: mutated / (all || 1),
    };
  }
}
