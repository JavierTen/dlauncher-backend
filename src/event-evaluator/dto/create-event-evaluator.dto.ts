import { IsArray, IsInt, IsNotEmpty, IsNumberString, IsPositive, IsString, Length } from "class-validator";

export class EvaluatorDto {

    userId: number;

    eventId: number;
}
