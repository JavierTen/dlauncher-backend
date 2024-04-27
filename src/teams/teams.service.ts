import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { Teams } from './entities/team.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { nanoid } from 'nanoid';
import { UsersTeamsEvents } from 'src/users-team-event/entities/users-team-event.entity';

@Injectable()
export class TeamsService {

  constructor(
    @InjectRepository(Teams) private teamRepository: Repository<Teams>,
    @InjectRepository(Teams) private teamsRepository: Repository<Teams>,
    @InjectRepository(UsersTeamsEvents) private userRepository: Repository<UsersTeamsEvents>,
  ) { }



  async create(team: CreateTeamDto) {

    const { name, userId } = team;
    const eventId = team['event'];


    const newTeam = this.teamRepository.create(team)

    try {

      const usuario = await this.userRepository.find({
        where: { user: { id: userId } },
        relations: ['team'],
      });


      if (usuario) {
        const teamIds = usuario.map(user => user.team.id);

        const equiposEnEvento = await this.teamRepository.find({
          where: {
            id: In(teamIds), // Utiliza el operador "In" para verificar si el ID del equipo está en la lista de teamIds   
          },
          relations: ['event'],
        });

        if (equiposEnEvento) {
          const eventIds = equiposEnEvento.map(team => team.event.id);

          if (eventIds.includes(eventId)) {
            return {
              ok: false,
              error: 'USER_EVENT_CONFLICT',
            };
          }
        }
      }


      const findNameTeam = await this.teamRepository.find({
        where: {
          name: name
        },
        relations: ['event'],
      })

      if (findNameTeam) {

        const teamEventId = findNameTeam.map(team => team.event.id);
        if (teamEventId.includes(eventId)) {
          return {
            ok: false,
            error: 'EXISTING_TEAM',
          };
        }
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

  async findAllMembers() {
    return `This action returns all teams`;
  }

  async find(id: number) {
    try {
      const team = await this.teamRepository.findOne({
        where: {
          id: id
        },
        relations: ['event'],
      })
      const { event, ...teamWithoutEvent } = team;

      if (!team) {
        return {
          ok: false,
          error: 'TEAM_DOES_NOT_EXIST',
        };
      }

      return {
        ok: true,
        team: teamWithoutEvent,
        endEvent: team.event.endsAt
      };


    } catch (error) {
      return error
    }

  }

  async findTeamsResult(id: number) {
    try {
      const results = await this.teamRepository.find({
        where: {
          event: { id }
        },
        order: {
          score: 'DESC',
        },
        relations: ['usersTeamsEvents', 'usersTeamsEvents.user']
      }
      )

      if (!results) {
        return {
          ok: false,
          error: 'TEAM_DOES_NOT_EXIST',
        };
      }
      return {
        ok: true,
        results
      };
    } catch (error) {
      return error
    }

  }

  async findOne(id: number) {
    try {
      const findTeam = await this.teamRepository.findOne({
        where: {
          id: id
        },
        relations: ['event']
      })

      if (!findTeam) {
        return {
          ok: false,
          error: 'TEAM_DOES_NOT_EXIST',
        };
      }

      const findMembers = await this.userRepository.find({
        where: {
          team: { id }
        },
        relations: ['user']
      })
      console.log('------------------')
      const maxMembers = findTeam.event.maxMembers
      console.log(findTeam.event.id)
      const closeEvaluation = findTeam.event.closEvaluationAt
      const closeEvent = findTeam.event.endsAt
      const members = findMembers.map(members => members.user)
      const { event, ...teamData } = findTeam;

      function validarFechas(closeEvent: Date, closeEvaluation: Date): boolean {
        // Convertir las cadenas de fecha a objetos de fecha
        const fechaActual = new Date();
        const fechaCierreEvento = new Date(closeEvent);
        const fechaCierreEvaluacion = new Date(closeEvaluation);


        console.log(fechaActual)
        console.log(fechaCierreEvento)
        console.log(fechaCierreEvaluacion)
        // Comparar si la fecha actual está entre closeEvent y closeEvaluation
        return fechaActual > fechaCierreEvento && fechaActual < fechaCierreEvaluacion;
      }

      const result = validarFechas(closeEvent, closeEvaluation);

      console.log(result)




      return {
        ok: true,
        team: teamData,
        idEvent: findTeam.event.id,
        slugEvent: findTeam.event.slug,
        members,
        maxMembers,
        assess: result
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
      const { event } = findTeam;
      const currentDate = new Date();
      currentDate.setHours(currentDate.getHours() - 5);

      const closeAt = event.closeAt;
  
      const isBeforeCloseAt = currentDate < event.closeAt;


      if (!findTeam) {
        return {
          ok: false,
          error: 'TEAM_DOES_NOT_EXIST',
        };
      }

      if (!isBeforeCloseAt) {
        return {
          ok: false,
          error: 'CLOSED_REGISTRARTIONS',
          datenow: currentDate,
          dateclose: closeAt
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

      const found = usuario.some(item => item.user.id === userId);
      if (found) {
        return {
          ok: false,
          error: 'USER_EVENT_CONFLICT',
          enabled: false
        };
      }

      return {
        ok: true,
        enabled: true,
        team: findTeam.id,
        datenow: currentDate,
        dateclose: closeAt
      };


    } catch (error) {
      return error
    }

  }

  async byEvent(id: number) {

    try {

      const teams = await this.teamRepository.find({
        where: {
          event: {
            id: id
          }
        },
        relations: ['usersTeamsEvents', 'event']
      })

      const teamsWithMembersCount = teams.map(team => ({
        ...team,
        membersCount: team.usersTeamsEvents.length
      }));

      const teamsWithoutMembersData = teamsWithMembersCount.map(({ usersTeamsEvents, ...rest }) => rest);
      const maxMembers = teams.length > 0 ? teams[0].event.maxMembers : 0;
      const teamsWithoutEventData = teamsWithoutMembersData.map(({ event, ...rest }) => rest);




      console.log(teams)

      return {
        ok: true,
        teams: teamsWithoutEventData,
        maxMembers
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

      const datateam = findTeam.filter(data => data.team.event.id === eventId);

      const data = datateam.map(data => ({
        eventName: data.team.event.name,
        eventSlug: data.team.event.slug,
        startDate: data.team.event.startAt,
        endDate: data.team.event.endsAt,
        closeDate: data.team.event.closeAt,
        closeEvaluation: data.team.event.closEvaluationAt,
        rolUserTeam: data.rol,
        idTeam: data.team.id,
        nameTeam: data.team.name,
        tokenTeam: data.team.token,
        idEvent: data.team.event.id,
        document: data.team.event.documentUrl,
        score: data.team.score,
        github: data.team.github,
        youtube: data.team.youtube,
        participated: (data.team.github !== null && data.team.youtube !== null) && data.team.score !== 0
      }));
      console.log('------------------')
      const idTeam = data[0].idTeam;
      const endDate = data[0].endDate;
      const closeEvaluation = data[0].closeEvaluation;
      console.log(data[0].idEvent)
      console.log(idTeam)
      function validarFechas(endDate: Date, closeEvaluation: Date): boolean {
        // Convertir las cadenas de fecha a objetos de fecha
        const fechaActual = new Date();
        const fechaCierreEvento = new Date(endDate);
        const fechaCierreEvaluacion = new Date(closeEvaluation);

        console.log(fechaActual)
        console.log(fechaCierreEvento)
        console.log(fechaCierreEvaluacion)


        // Comparar si la fecha actual está entre closeEvent y closeEvaluation
        return fechaActual > fechaCierreEvento && fechaActual < fechaCierreEvaluacion;
      }

      const result = validarFechas(endDate, closeEvaluation);
      let win: boolean;
      if (!result) {
        const findTeam = await this.teamsRepository.find({
          where: {
            event: { id: eventId }
          },
          order: {
            score: "DESC"
          }
        })
        

        if (findTeam.length > 0) {
          // Obtenemos la puntuación más alta
          const highestScore = findTeam[0].score;

          // Filtramos los equipos con la puntuación más alta
          const highestScoringTeams = findTeam.filter(team => team.score === highestScore);

          // Obtenemos los IDs de los equipos con la puntuación más alta
          const highestScoringTeamIds = highestScoringTeams.map(team => team.id);

          // Eliminamos los equipos que no tienen la puntuación más alta
          const remainingTeams = findTeam.filter(team => highestScoringTeamIds.includes(team.id));

          // Ahora `remainingTeams` contiene solo los equipos con la puntuación más alta
          console.log(remainingTeams);

          const specificTeam = remainingTeams.find(team => team.id === idTeam);
          
          if (specificTeam) {
             win = true
          } else {
           win = false
          }
        } 
      }

      return {
        ok: true,
        data,
        win
      };


    } catch (error) {
      return error
    }

  }

  async update(id: number, updateTeamDto: UpdateTeamDto) {
    const team = await this.teamRepository.findOne({
      where: {
        id: id
      }
    });

    if (!team) {
      throw new NotFoundException('Equipo no encontrado');
    }

    if (updateTeamDto.project) {
      team.project = updateTeamDto.project;
    }

    if (updateTeamDto.description) {
      team.description = updateTeamDto.description;
    }

    if (updateTeamDto.youtube) {
      team.youtube = updateTeamDto.youtube;
    }

    if (updateTeamDto.github) {
      team.github = updateTeamDto.github;
    }

    const update = this.teamRepository.save(team);

    return {
      ok: true,
      update
    }


  }

  async remove(id: number) {
    const team = await this.teamRepository.findOne({
      where: {
        id: id
      }
    });

    if (!team) {
      return false; // El usuario no existe
    }

    await this.teamRepository.remove(team);
    return true; // Usuario eliminado con éxito
  }

  async total(): Promise<number> {
    try {
      const count = await this.teamsRepository.count();
      return count;
    } catch (error) {
      throw new HttpException('Error counting teams', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
