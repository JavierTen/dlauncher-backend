import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateRubricDto {

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsOptional()
    slug?: string;

}
