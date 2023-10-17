import { Module } from '@nestjs/common';
import { EventEvaluatorService } from './event-evaluator.service';
import { EventEvaluatorController } from './event-evaluator.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventEvaluator } from './entities/event-evaluator.entity';
import { Users } from 'src/users/entities/user.entity';
import { Events } from 'src/events/entities/event.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EventEvaluator,Users,Events])],
  controllers: [EventEvaluatorController],
  providers: [EventEvaluatorService],
  exports: [EventEvaluatorService, TypeOrmModule]
})
export class EventEvaluatorModule {}
