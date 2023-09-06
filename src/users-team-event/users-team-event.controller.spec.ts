import { Test, TestingModule } from '@nestjs/testing';
import { UsersTeamEventController } from './users-team-event.controller';
import { UsersTeamEventService } from './users-team-event.service';

describe('UsersTeamEventController', () => {
  let controller: UsersTeamEventController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersTeamEventController],
      providers: [UsersTeamEventService],
    }).compile();

    controller = module.get<UsersTeamEventController>(UsersTeamEventController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
