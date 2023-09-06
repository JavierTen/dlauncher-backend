import {IsNotEmpty, IsString, Length, IsNumberString, IsDate } from "class-validator"

export class CreateTeamDto {

    @IsNotEmpty()
    @IsString()
    @Length(3, 40, { message: 'Los nombres deben tener entre 3 y 20 caracteres' })
    name: string;

    token: string;

    eventId: number;

    userId: number; 
}
