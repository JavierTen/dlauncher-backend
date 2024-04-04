import { PartialType } from '@nestjs/mapped-types';
import { CreateRubricsSectionDto } from './create-rubrics_section.dto';

export class UpdateRubricsSectionDto extends PartialType(CreateRubricsSectionDto) {}
