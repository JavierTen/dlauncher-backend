import { Test, TestingModule } from '@nestjs/testing';
import { EvaluatorQualificationController } from './evaluator-qualification.controller';
import { EvaluatorQualificationService } from './evaluator-qualification.service';

describe('EvaluatorQualificationController', () => {
  let controller: EvaluatorQualificationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EvaluatorQualificationController],
      providers: [EvaluatorQualificationService],
    }).compile();

    controller = module.get<EvaluatorQualificationController>(EvaluatorQualificationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
