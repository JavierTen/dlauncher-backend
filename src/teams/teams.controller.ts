import { Controller, Get, Post, Body, Patch, Put, Param, Delete, HttpException, HttpStatus, NotFoundException } from '@nestjs/common';
import { TeamsService } from './teams.service';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';

@Controller('teams')
export class TeamsController {
  constructor(private readonly teamsService: TeamsService) { }

  @Post('create')
  async create(@Body() createObjectTeam: CreateTeamDto) {
    try {
      const team = await this.teamsService.create(createObjectTeam);
      if (team) {
        return {
          team
        };
      } else {
        throw new HttpException(
          {
            ok: false,
            error: 'ERROR_CREATE_TEAM',
          },
          HttpStatus.CONFLICT
        );
      }

    } catch (error) {

    }

  }

  @Get()
  findAllMembers() {
    return this.teamsService.findAllMembers();
  }

  @Get('count')
  async countTeams(): Promise<{ count: number }> {
    const count = await this.teamsService.total();
    return { count };
  }

  @Get('byEvent/:id')
  async byEvent(@Param('id') id: number) {
    return this.teamsService.byEvent(id);
  }

  @Get('byID/:id')
  async find(@Param('id') id: number) {
    return this.teamsService.find(id);
  }

  @Get('results/:id')
  async findTeamsResult(@Param('id') id: number) {
    return this.teamsService.findTeamsResult(id);
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.teamsService.findOne(id);
  }

  

  @Get('token/:token/:id')
  findByToken
    (@Param('token',) token: string,
      @Param('id') id: number) {
    return this.teamsService.findByToken(token, +id);
  } 

  @Get('event/:event/:user')
  findByEvent
    (@Param('event',) event: number,
      @Param('user') user: number) {
    return this.teamsService.findByEvent(+event, +user);
  }

  

  @Put(':id')
  update(@Param('id') id: string, @Body() updateTeamDto: UpdateTeamDto) {
    return this.teamsService.update(+id, updateTeamDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    const deleted = await this.teamsService.remove(id);

    if (!deleted) {
      throw new NotFoundException(`Equipo con ID ${id} no encontrado.`);
    }

    return { message: `Equipo con ID ${id} eliminado correctamente.` };
  }
}
