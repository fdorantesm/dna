import { IsString } from 'class-validator';

export class CreateMutationDto {
  @IsString({
    each: true,
  })
  public readonly mutations: string[];
}
