import { Test, TestingModule } from '@nestjs/testing';
import { SectionsParametersController } from './sections_parameters.controller';
import { SectionsParametersService } from './sections_parameters.service';

describe('SectionsParametersController', () => {
  let controller: SectionsParametersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SectionsParametersController],
      providers: [SectionsParametersService],
    }).compile();

    controller = module.get<SectionsParametersController>(SectionsParametersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
