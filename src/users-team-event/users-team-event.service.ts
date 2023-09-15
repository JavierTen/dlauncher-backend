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

  async createUTE(usersTeamEvent) {

    const { teamId } = usersTeamEvent

    // 1. Obtiene el equipo asociado al evento
    const team = await this.teamRepository.findOne({
      where: {
        id: teamId
      },
      relations: ['event'],
    });

    console.log(team.event)

    //2. Obtiene el número máximo de integrantes permitidos en el evento
    const maxMembers = team.event.maxMembers;


    // // 3. Cuenta cuántos miembros ya están registrados en el equipo para el evento
    const currentMembersCount = await this.userTeamEventRepository.count({
      where: {
        team: { id: team.id }, // Proporciona un objeto que representa la entidad Teams
      },
    });

    console.log(currentMembersCount)


    //6. Verifica si el equipo está completo
    if (currentMembersCount >= maxMembers) {
      return {
        ok: false,
        message: 'El equipo ya está completo para este evento.',
      };
    }


    const newUTE = this.userTeamEventRepository.create(usersTeamEvent)
    try {

      const UTE = await this.userTeamEventRepository.save(newUTE)

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
      const removeUTE = await this.userTeamEventRepository.findOne({
        where: {
          user: { id }
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
