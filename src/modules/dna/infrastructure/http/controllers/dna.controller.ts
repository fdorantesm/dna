import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  Post,
  UseGuards,
} from '@nestjs/common';

import { BearerAuthGuard } from '../../../../../auth/infraestructure/passport/guards/bearer.guard';
import { Json } from '../../../../../app/types/json.type';
import { DnaApplicationService } from '../../../application/services/dna.application.service';
import { CreateDnaDto } from '../dtos/create-dna.dto';

@Controller({
  version: '1',
  path: '/dna',
})
export class DnaController {
  constructor(private readonly dnaApplicationService: DnaApplicationService) {}

  @UseGuards(BearerAuthGuard)
  @Post('/mutations')
  public lookupDna(@Body() body: CreateDnaDto) {
    try {
      return this.dnaApplicationService.lookupDna(body.dna);
    } catch (error) {
      throw new ForbiddenException(error.message);
    }
  }

  @Get('/stats')
  public getStats(): Json {
    return this.dnaApplicationService.getStats();
  }
}
