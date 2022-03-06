import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BulkWriteResult } from 'mongodb';
import { FilterQuery, PaginateResult, PaginateModel } from 'mongoose';

import { DnaEntity } from '../../../domain/entities/dna.entity';
import { CreateDnaDto } from '../dtos/create-dna.dto';
import { DnaModel } from '../models/dna/dna.model';

@Injectable()
export class DnaRepository {
  constructor(
    @InjectModel(DnaModel.name)
    private readonly dnaModel: PaginateModel<DnaModel>,
  ) {}

  public async findOne(filter: FilterQuery<DnaModel>): Promise<DnaEntity> {
    const model = await this.dnaModel.findOne(filter).exec();
    return {
      uuid: model.uuid,
      mutations: model.mutations,
      mutationsCount: model.mutationsCount,
      sequence: model.sequence,
    };
  }

  public find(
    filter: FilterQuery<DnaModel>,
  ): Promise<PaginateResult<DnaModel>> {
    return this.dnaModel.paginate(filter);
  }

  public async create(dna: CreateDnaDto): Promise<DnaEntity> {
    const model = await this.dnaModel.create(dna);
    return {
      uuid: model.uuid,
      sequence: model.sequence,
      mutations: model.mutations,
      mutationsCount: model.mutationsCount,
    };
  }

  public async createMany(dnas: DnaModel[]): Promise<BulkWriteResult> {
    return await this.dnaModel.bulkWrite(dnas);
  }
}
