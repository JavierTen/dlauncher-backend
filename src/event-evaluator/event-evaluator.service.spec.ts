import { Test, TestingModule } from '@nestjs/testing';
import { EventEvaluatorService } from './event-evaluator.service';

describe('EventEvaluatorService', () => {
  let service: EventEvaluatorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EventEvaluatorService],
    }).compile();

    service = module.get<EventEvaluatorService>(EventEvaluatorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
