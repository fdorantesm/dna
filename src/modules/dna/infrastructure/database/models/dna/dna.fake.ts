import { CreateDnaDto } from '../../dtos/create-dna.dto';

export class DnaFakeModel {
  public create(dna: CreateDnaDto) {
    return {
      mutations: dna.mutations,
      mutationsCount: dna.mutationsCount,
      sequence: dna.sequence,
      uuid: '4ccff333-f2c9-4816-93a5-79812ad1d635',
      createdAt: '2022-03-06T05:00:31.774+00:00',
      updatedAt: '2022-03-06T05:00:31.774+00:00',
    };
  }

  public countDocuments(filter?) {
    return {
      exec() {
        return filter ? 40 : 100;
      },
    };
  }
}
