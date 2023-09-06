import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Users } from './entities/user.entity';
import { Roles } from 'src/roles/entities/rol.entity';
import { UsersTeamsEvents } from 'src/users-team-event/entities/users-team-event.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Users, Roles, UsersTeamsEvents])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService, TypeOrmModule]
})
export class UsersModule {}
