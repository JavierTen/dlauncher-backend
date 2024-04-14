import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Query, HttpException, HttpStatus, UseGuards, NotFoundException } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthgGuard } from 'src/auth/auth.guard';
import { JwtService } from '@nestjs/jwt'
import * as nodemailer from 'nodemailer';
import { UpdatePasswordDto } from './dto/update-password.dto';


@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService,
    private jwtService: JwtService) { }

  @Post('create-by-admin')
  async createByAdmin(@Body() newUser: CreateUserDto) {
    const createdUser = await this.usersService.createByAdmin(newUser);
    var role: string;
    if (String(createdUser.role) === '1') {
      role = 'user';
    }

    if (String(createdUser.role) === '3') {
      role = 'evaluator';
    }

    const payload = {
      id: createdUser.id,
      name: createdUser.name,
      lastname: createdUser.lastname,
      validate: createdUser.validated,
      avatar: createdUser.avatar,
      rol: role
    }

    const token = await this.jwtService.sign(payload)


    return {
      ok: true,
      token
    };

  }

  @Post('create')
  async create(@Body() newUser: CreateUserDto) {
    const createdUser = await this.usersService.create(newUser);
    var role: string;
    if (String(createdUser.role) === '1') {
      role = 'user';
    }
    if (String(createdUser.role) === '2') {
      role = 'admin';
    }
    if (String(createdUser.role) === '3') {
      role = 'jury';
    }

    const payload = {
      id: createdUser.id,
      name: createdUser.name,
      lastname: createdUser.lastname,
      validate: createdUser.validated,
      avatar: createdUser.avatar,
      rol: role
    }

    const token = await this.jwtService.sign(payload)


    return {
      ok: true,
      token
    };

  }
  
  @Post('byEmail')
  async getUserByEmail(@Body() updateUserDto: UpdateUserDto) {
    return await this.usersService.getUserByEmail(updateUserDto);
    
  }

  @Get('byId/:idUser')
  async getUserById(@Param('idUser') idUser: number) {
    try {
      const user = await this.usersService.findById(idUser);
      if (user) {
        return {
          ok: true,
          user,
        };
      } else {
        throw new HttpException(
          {
            ok: false,
            error: 'USER_NOT_FOUND',
          },
          HttpStatus.NOT_FOUND
        );
      }
    } catch (error) {
      throw error;
    }
  }

  @Get('events/:idUser')
  find(@Param('idUser') idUser: number) {

    return this.usersService.findUserEvents(idUser);
  }
  

  @Get('evaluators')
  async findEvaluators() {
    const users = await this.usersService.findEvaluators();
    return users
  }
  
  @Get()
  async findUsers() {
    const users = await this.usersService.findUsers();
    return users
  }

  @Get('count-users')
  async countUsers(): Promise<{ count: number }> {
    const count = await this.usersService.countUsers();
    return { count };
  }

  @Get('count-evaluators')
  async countEvaluators(): Promise<{ count: number }> {
    const count = await this.usersService.countEvaluators();
    return { count };
  }

  @Put('forgot-password')
  async updatePasswordForgot(@Body() updateUserDto: UpdateUserDto) {
    const update = await this.usersService.updatePasswordForgot(updateUserDto);
    return update
  }

  @Put(':id')
  async updateUser(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    const user = await this.usersService.updateUser(id, updateUserDto);

    const payload = {
      id: user.id,
      name: user.name,
      lastname: user.lastname,
      validate: user.validated,
      avatar: user.avatar
    }

    const token = await this.jwtService.sign(payload)


    return {
      ok: true,
      token
    };

  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.usersService.update(+id, updateUserDto);
  // }

  @Delete(':id')
  async deleteUser(@Param('id') id: number) {
    const deleted = await this.usersService.deleteUserById(id);

    if (!deleted) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado.`);
    }

    return { message: `Usuario con ID ${id} eliminado correctamente.` };
  }

  




}


