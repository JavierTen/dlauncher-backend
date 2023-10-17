import { IsNotEmpty, MinLength } from 'class-validator';

export class UpdatePasswordForgotDto {
  @IsNotEmpty()
  oldPassword: string;

  @IsNotEmpty()
  @MinLength(8) 
  newPassword: string;
}