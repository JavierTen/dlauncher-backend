import { PartialType } from '@nestjs/mapped-types';
import { EvaluatorDto } from './create-event-evaluator.dto';

export class UpdateEventEvaluatorDto extends PartialType(EvaluatorDto) {}
