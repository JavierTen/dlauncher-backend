
import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Rubric } from "src/rubrics/entities/rubric.entity";
export class CreateRubricsSectionDto {
    
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsOptional()
    @IsOptional()
    rubricId?: Rubric; 
}
