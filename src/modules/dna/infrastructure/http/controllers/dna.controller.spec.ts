import { Test, TestingModule } from '@nestjs/testing';
import { DnaApplicationService } from '../../../application/services/dna.application.service';
import { DnaController } from './dna.controller';

describe('DnaController', () => {
  let controller: DnaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DnaController],
      providers: [DnaApplicationService],
    }).compile();

    controller = module.get<DnaController>(DnaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
