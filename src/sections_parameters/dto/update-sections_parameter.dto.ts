import { PartialType } from '@nestjs/mapped-types';
import { CreateSectionsParameterDto } from './create-sections_parameter.dto';

export class UpdateSectionsParameterDto extends PartialType(CreateSectionsParameterDto) {}
