import { IsEmail, IsNotEmpty, IsString, Length, IsNumberString, IsDate } from "class-validator"

export class EventUserDto {
    @IsNotEmpty()        
    idUser: number;
}