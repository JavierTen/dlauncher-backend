import { Test, TestingModule } from '@nestjs/testing';
import { UsersTeamEventService } from './users-team-event.service';

describe('UsersTeamEventService', () => {
  let service: UsersTeamEventService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersTeamEventService],
    }).compile();

    service = module.get<UsersTeamEventService>(UsersTeamEventService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
