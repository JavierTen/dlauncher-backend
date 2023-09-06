import {IsNotEmpty, IsString, Length, IsNumberString, IsDate } from "class-validator"

export class CreateUsersTeamEventDto {

    userId: number;
    teamId: number;

}
