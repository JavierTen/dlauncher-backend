import { IsArray, IsInt, IsNotEmpty, IsNumberString, IsPositive, IsString, Length } from "class-validator";

export class EvaluatorDto {

    @IsArray()
    @IsInt({ each: true, message: 'Evaluators should be an array of integers' })
    @IsPositive({ each: true, message: 'Evaluators should be positive integers' })
    usersId: number[];

    @IsInt({ message: 'Event should be an integer' })
    @IsPositive({ message: 'Event should be a positive integer' })
    eventId: number;
}
