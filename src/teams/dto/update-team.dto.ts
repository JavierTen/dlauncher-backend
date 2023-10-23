import { PartialType } from '@nestjs/mapped-types';
import { CreateTeamDto } from './create-team.dto';
import { IsString, IsOptional } from 'class-validator';

export class UpdateTeamDto {
    @IsString()
  @IsOptional()
  project?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  youtube?: string;

  @IsString()
  @IsOptional()
  github?: string;
}
