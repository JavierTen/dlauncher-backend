import { HttpException, Injectable } from '@nestjs/common';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { Teams } from './entities/team.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { nanoid } from 'nanoid';
import { UsersTeamsEvents } from 'src/users-team-event/entities/users-team-event.entity';

@Injectable()
export class TeamsService {

  constructor(
    @InjectRepository(Teams) private teamRepository: Repository<Teams>,
    @InjectRepository(UsersTeamsEvents) private userRepository: Repository<UsersTeamsEvents>,
  ) { }



  async create(team: CreateTeamDto) {

    const { name, eventId, userId } = team;

    const newTeam = this.teamRepository.create(team)

    try {

      const usuario = await this.userRepository.findOne({
        where: {
          user: { id: userId },
          team: {
            event: { id: eventId }
          }
        },
        relations: ['user', 'team'] // Cargar relaciones necesarias
      });

      if (usuario) {
        return {
          ok: false,
          error: 'USER_EVENT_CONFLICT'
        };
      }


      const findNameTeam = await this.teamRepository.findOne({
        where: {
          name: name,
          event: { id: eventId }
        }
      })

      if (findNameTeam) {
        return {
          ok: false,
          error: 'EXISTING_TEAM',
        };
      }

      const team = await this.teamRepository.save(newTeam)

      return {
        ok: true,
        data: team,
      };

    } catch (error) {
      return error
    }

  }

  findAllMembers() {
    return `This action returns all teams`;
  }

  async findOne(id: number) {   
    try {
      const findTeam = await this.teamRepository.findOne({
        where: {
          id: id
        },
      })

      const findMembers = await this.userRepository.find({
        where: {
          team: { id }
        },
        relations: ['user']
      })

      const members = findMembers.map(members => members.user)


      if (!findTeam) {
        return {
          ok: false,
          error: 'TEAM_DOES_NOT_EXIST',
        };
      }

      return {
        ok: true,
        team: findTeam,
        members
      };


    } catch (error) {
      return error
    }

  }


  async findByToken(token: string, userId: number) {
    
    try {
      const findTeam = await this.teamRepository.findOne({
        where: {
          token: token
        },
        relations: ['event']
      })

      if (!findTeam) {
        return {
          ok: false,
          error: 'TEAM_DOES_NOT_EXIST',
        };
      }

      const usuario = await this.userRepository.find({
        where: {          
          team: {
            event: { id: findTeam.event.id }
          }
        },
        relations: ['user'] // Cargar relaciones necesarias
      });

      const seEncontro = usuario.some(item => item.user.id === userId);
      if(seEncontro){
        return {
          ok: false,
          error: 'USER_EVENT_CONFLICT',
          enabled: false
        };
      }

      return {
        ok: true,
        enabled: true,
        team: findTeam.id
      };





    } catch (error) {
      return error
    }

  }

  async findByEvent(eventId: number, id: number) {
    
    try {

      const findTeam = await this.userRepository.find({
        where: {
          user: { id }
        },
        relations: ['team.event']
      })
      
      
      const team = findTeam.filter(usuario => usuario.team.event.id === eventId);

      const data = team.map(usuario => ({
        eventName: usuario.team.event.name,
        rolUserTeam: usuario.rol,
        idTeam: usuario.team.id,
        nameTeam: usuario.team.name,
        tokenTeam: usuario.team.token
      }));

      return {
        ok: true,
        data
      };

      
    } catch (error) {
      return error
    }

  }

  update(id: number, updateTeamDto: UpdateTeamDto) {
    return `This action updates a #${id} team`;
  }

  remove(id: number) {
    return `This action removes a #${id} team`;
  }
}
