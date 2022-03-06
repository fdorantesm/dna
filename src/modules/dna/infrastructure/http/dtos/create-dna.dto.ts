import { IsString, Matches } from 'class-validator';

export class CreateDnaDto {
  @IsString({
    each: true,
  })
  @Matches(/^[+\-AGCT]+$/, { each: true })
  public readonly dna: string[];
}
