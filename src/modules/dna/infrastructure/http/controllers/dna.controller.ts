import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBody,
  ApiResponse,
  ApiTags,
  ApiTooManyRequestsResponse,
  ApiUnauthorizedResponse,
  ApiSecurity,
} from '@nestjs/swagger';

import { BearerAuthGuard } from '../../../../auth/infraestructure/passport/guards/bearer.guard';
import { Json } from '../../../../../app/types/json.type';
import { DnaApplicationService } from '../../../application/services/dna.application.service';
import { CreateDnaDto } from '../dtos/create-dna.dto';

@ApiTags('DNA')
@Controller({
  version: '1',
  path: '/dna',
})
export class DnaController {
  constructor(private readonly dnaApplicationService: DnaApplicationService) {}

  @ApiSecurity('Authorization')
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'DNA sequence has mutations.',
  })
  @ApiBody({
    description: 'DNA Sequence',
    type: CreateDnaDto,
  })
  @ApiUnauthorizedResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized',
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'DNA sequence has not mutations',
  })
  @ApiTooManyRequestsResponse({
    status: HttpStatus.TOO_MANY_REQUESTS,
    description: 'Too many requests',
  })
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
