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

  @IsInt()
  maxMembers: number;

  @IsBoolean()
  post: boolean;

  @IsString()
  description: string;

  @IsString()
  @IsOptional()
  slug: string;
}

