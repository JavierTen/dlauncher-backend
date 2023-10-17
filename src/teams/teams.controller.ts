import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus } from '@nestjs/common';
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

  

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTeamDto: UpdateTeamDto) {
    return this.teamsService.update(+id, updateTeamDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.teamsService.remove(+id);
  }
}
