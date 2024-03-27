import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { UsersTeamEventService } from './users-team-event.service';
import { CreateUsersTeamEventDto } from './dto/create-users-team-event.dto';
import { UpdateUsersTeamEventDto } from './dto/update-users-team-event.dto';

@Controller('users-team-event')
export class UsersTeamEventController {
  constructor(private readonly usersTeamEventService: UsersTeamEventService) {}

  @Post('add')
  create(@Body() userTeamEventDto: CreateUsersTeamEventDto) {
    try {      
      return  this.usersTeamEventService.createUTE(userTeamEventDto);
    } catch (error) {
      throw error;
    }
    
  }

  @Get()
  findAll() {
    return this.usersTeamEventService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersTeamEventService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUsersTeamEventDto: UpdateUsersTeamEventDto) {
    return this.usersTeamEventService.update(+id, updateUsersTeamEventDto);
  }

  @Delete(':idUser/:idTeam')
  remove(@Param('idUser') idUser: number, @Param('idTeam') idTeam: number) {
    return this.usersTeamEventService.remove(idUser, idTeam);
  }
}
