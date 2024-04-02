import { IsString, IsDate, IsInt, IsBoolean, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateEventDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  startAt: Date;

  @IsNotEmpty()
  endsAt: Date;

  @IsNotEmpty()
  closeAt: Date;

  @IsNotEmpty()
  closEvaluationAt: Date;

  @IsInt()
  maxMembers: number;

  @IsBoolean()
  post: boolean;

  @IsString()
  shortDescription: string;

  @IsString()
  description: string;

  @IsString()
  @IsOptional()
  slug: string;
}

