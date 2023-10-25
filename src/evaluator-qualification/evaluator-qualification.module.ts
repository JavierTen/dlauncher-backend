import { Module } from '@nestjs/common';
import { EvaluatorQualificationService } from './evaluator-qualification.service';
import { EvaluatorQualificationController } from './evaluator-qualification.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Teams } from 'src/teams/entities/team.entity';
import { EvaluatorQualification } from './entities/evaluator-qualification.entity';
import { Users } from 'src/users/entities/user.entity';
import { EventEvaluator } from 'src/event-evaluator/entities/event-evaluator.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Teams, Users,EvaluatorQualification, EventEvaluator])],
  controllers: [EvaluatorQualificationController],
  providers: [EvaluatorQualificationService]
})
export class EvaluatorQualificationModule {}
