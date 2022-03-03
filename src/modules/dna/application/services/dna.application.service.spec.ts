import { Test, TestingModule } from '@nestjs/testing';
import { DnaApplicationService } from './dna.application.service';

describe('DnaApplicationService', () => {
  let service: DnaApplicationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DnaApplicationService],
    }).compile();

    service = module.get<DnaApplicationService>(DnaApplicationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
