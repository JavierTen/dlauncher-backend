import { Test, TestingModule } from '@nestjs/testing';
import { RubricsSectionsController } from './rubrics_sections.controller';
import { RubricsSectionsService } from './rubrics_sections.service';

describe('RubricsSectionsController', () => {
  let controller: RubricsSectionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RubricsSectionsController],
      providers: [RubricsSectionsService],
    }).compile();

    controller = module.get<RubricsSectionsController>(RubricsSectionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
