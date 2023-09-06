import { Module } from '@nestjs/common';
import { TeamsService } from './teams.service';
import { TeamsController } from './teams.controller';
import { Teams } from './entities/team.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersTeamsEvents } from 'src/users-team-event/entities/users-team-event.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Teams, UsersTeamsEvents])],
  controllers: [TeamsController],
  providers: [TeamsService]
})
export class TeamsModule {}
