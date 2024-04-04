import { Test, TestingModule } from '@nestjs/testing';
import { SectionsParametersService } from './sections_parameters.service';

describe('SectionsParametersService', () => {
  let service: SectionsParametersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SectionsParametersService],
    }).compile();

    service = module.get<SectionsParametersService>(SectionsParametersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
