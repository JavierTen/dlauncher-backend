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
    @InjectRepository(UsersTeamsEvents) private userTeamEventRepository: Repository<UsersTeamsEvents>,
    @InjectRepository(Teams) private teamRepository: Repository<Teams>,
  ) { }


  async countRecordsByTeamId(teamId: number): Promise<number> {
    try {
      const count = await this.userTeamEventRepository
        .createQueryBuilder('usersTeamsEvents')
        .where('usersTeamsEvents.teamId = :teamId', { teamId })
        .getCount();
  
      return count;
    } catch (error) {
      // Manejo de errores
      throw error;
    }
  }

  async createUTE(usersTeamEvent) {

    try {
      const { team, user } = usersTeamEvent

      // 1. Obtiene el equipo asociado al evento
      const teamData = await this.teamRepository.findOne({
        where: {
          id: team
        },
        relations: ['event'],
      });

      if (!teamData) {
        throw new Error('El equipo no fue encontrado');
      }

      const existingUTE = await this.userTeamEventRepository.findOne({
        where: {
          user: { id: user },
          team: { id: team },
        },
      });

      if (existingUTE) {
        return {
          ok: false,
          message: 'El usuario ya está registrado en este equipo para este evento.',
        };
      }

      //2. Obtiene el número máximo de integrantes permitidos en el evento
      const maxMembers = teamData.event.maxMembers;
      const countMembers = await this.countRecordsByTeamId(teamData.id);
      if (countMembers >= maxMembers) {
        return {
          ok: false,
          message: 'El equipo ya está completo para este evento.',
        };
      }

      if(countMembers < maxMembers){
        const newUTE = this.userTeamEventRepository.create(usersTeamEvent)
        try {
    
          const UTE = await this.userTeamEventRepository.save(newUTE)
    
          return {
            ok: true,
            UTE,
            nameTeam: teamData.name
          };
    
    
        } catch (error) {
          return error
        }
      }

    } catch (error) {
      throw error;
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

  async remove(idUser: number, idTeam: number) {

    try {
      const removeUTE = await this.userTeamEventRepository.findOne({
        where: {
          user: { id: idUser },
          team: { id: idTeam }
        }
      })

      if (!removeUTE) {
        return {
          ok: false,
          error: 'USER_DOES_NOT_EXIST'
        };
      }

      await this.userTeamEventRepository.remove(removeUTE);

      return {
        ok: true,
        msg: 'USER_DELETE_TEAM'
      };


    } catch (error) {
      return error
    }

  }
}
