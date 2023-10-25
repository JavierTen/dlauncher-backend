import { PartialType } from '@nestjs/mapped-types';
import { CreateEvaluatorQualificationDto } from './create-evaluator-qualification.dto';

export class UpdateEvaluatorQualificationDto extends PartialType(CreateEvaluatorQualificationDto) {}
