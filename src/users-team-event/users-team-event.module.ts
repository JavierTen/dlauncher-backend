import { Module } from '@nestjs/common';
import { UsersTeamEventService } from './users-team-event.service';
import { UsersTeamEventController } from './users-team-event.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersTeamsEvents } from './entities/users-team-event.entity';
import { Users } from 'src/users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UsersTeamsEvents, Users])],
  controllers: [UsersTeamEventController],
  providers: [UsersTeamEventService],
  exports: [TypeOrmModule]
})
export class UsersTeamEventModule {}
