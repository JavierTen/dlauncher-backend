import { IsArray, IsInt, IsNotEmpty, IsNumberString, IsPositive, IsString, Length } from "class-validator";

export class SaveEvaluatorDto {
    
    userId: number[];

    eventId: number;
}
