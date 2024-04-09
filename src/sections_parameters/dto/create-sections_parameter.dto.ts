import { IsDecimal, IsNotEmpty, IsNumber, IsOptional, IsString, Max, Min } from "class-validator";
import { RubricsSection } from "src/rubrics_sections/entities/rubrics_section.entity";



export class CreateSectionsParameterDto {

    @IsNumber({maxDecimalPlaces: 2})
    @Min(0.00)
    @Max(99999999.99)
    value: number;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsOptional()
    @IsOptional()
    sectionId?: RubricsSection;

}
