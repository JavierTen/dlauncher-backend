import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUsersTeamEventDto } from './dto/create-users-team-event.dto';
import { UpdateUsersTeamEventDto } from './dto/update-users-team-event.dto';
import { UsersTeamsEvents } from './entities/users-team-event.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from 'src/users/entities/user.entity';
import { Teams } from 'src/teams/entities/team.entity';
import { Events } from 'src/events/entities/event.entity';

@Injectable()
export class UsersTeamEventService {

  constructor(
    @InjectRepository(UsersTeamsEvents) private userRepository: Repository<UsersTeamsEvents>,

  ) { }

  async createUTE(usersTeamEvent) {
    

    const newUTE = this.userRepository.create(usersTeamEvent)
    try {

      const UTE = await this.userRepository.save(newUTE)

      return {
        ok: true,
        UTE
      };


    } catch (error) {
      return error
    }

  }

  findAll() {
    return `This action returns all usersTeamEvent`;
  }

  findOne(id: number) {
    return `This action returns a #${id} usersTeamEvent`;
  }

  update(id: number, updateUsersTeamEventDto: UpdateUsersTeamEventDto) {
    return `This action updates a #${id} usersTeamEvent`;
  }

  async remove(id: number) {
    
    try {
      const removeUTE = await this.userRepository.findOne({
        where:{
          user: {id}
        }
      })

      

      if(!removeUTE){
        return{
          ok: false,
          error: 'USER_DOES_NOT_EXIST'
        };
      }

      await this.userRepository.remove(removeUTE);
      
      return {
        ok: true,
        msg: 'USER_DELETE_TEAM'
      };
      
      
    } catch (error) {
      return error
    }
    
  }
}
