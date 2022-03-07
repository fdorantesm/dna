import { IsString, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDnaDto {
  @ApiProperty({
    description: 'DNA NxN Sequence',
    example: ['ATGTGA', 'CATTGC', 'TTATGT', 'TGAAGG', 'CCCCTA', 'TCACTG'],
  })
  @IsString({
    each: true,
  })
  @Matches(/^[+\-AGCT]+$/, { each: true })
  public readonly dna: string[];
}
