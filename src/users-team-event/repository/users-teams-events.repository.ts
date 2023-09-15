import { EntityRepository, Repository } from 'typeorm';
import { UsersTeamsEvents } from '../entities/users-team-event.entity';

@EntityRepository(UsersTeamsEvents)
export class UsersTeamsEventsRepository extends Repository<UsersTeamsEvents> {}
