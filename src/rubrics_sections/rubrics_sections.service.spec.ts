import { Test, TestingModule } from '@nestjs/testing';
import { RubricsSectionsService } from './rubrics_sections.service';

describe('RubricsSectionsService', () => {
  let service: RubricsSectionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RubricsSectionsService],
    }).compile();

    service = module.get<RubricsSectionsService>(RubricsSectionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
