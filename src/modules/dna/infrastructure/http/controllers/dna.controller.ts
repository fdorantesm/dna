import { Controller } from '@nestjs/common';
import { DnaApplicationService } from '../../../application/services/dna.application.service';

@Controller()
export class DnaController {
  constructor(private readonly dnaApplicationService: DnaApplicationService) {}
}
