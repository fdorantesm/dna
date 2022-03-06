import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  Post,
} from '@nestjs/common';

import { Json } from '../../../../../app/types/json.type';
import { DnaApplicationService } from '../../../application/services/dna.application.service';
import { CreateDnaDto } from '../dtos/create-dna.dto';

@Controller({
  version: '1',
  path: '/dna',
})
export class DnaController {
  constructor(private readonly dnaApplicationService: DnaApplicationService) {}

  @Post('/mutations')
  public createDnaMutation(@Body() body: CreateDnaDto) {
    try {
      return this.dnaApplicationService.createDnaMutation(body.dna);
    } catch (error) {
      throw new ForbiddenException(error.message);
    }
  }

  @Get('/stats')
  public getStats(): Json {
    return this.dnaApplicationService.getStats();
  }
}
