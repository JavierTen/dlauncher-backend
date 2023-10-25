import { Test, TestingModule } from '@nestjs/testing';
import { EvaluatorQualificationService } from './evaluator-qualification.service';

describe('EvaluatorQualificationService', () => {
  let service: EvaluatorQualificationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EvaluatorQualificationService],
    }).compile();

    service = module.get<EvaluatorQualificationService>(EvaluatorQualificationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
