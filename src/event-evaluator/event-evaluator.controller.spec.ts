import { Test, TestingModule } from '@nestjs/testing';
import { EventEvaluatorController } from './event-evaluator.controller';
import { EventEvaluatorService } from './event-evaluator.service';

describe('EventEvaluatorController', () => {
  let controller: EventEvaluatorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EventEvaluatorController],
      providers: [EventEvaluatorService],
    }).compile();

    controller = module.get<EventEvaluatorController>(EventEvaluatorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
