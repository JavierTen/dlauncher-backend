import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Query, HttpException, HttpStatus, UseGuards } from '@nestjs/common';
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

  @Post('create')
  async create(@Body() newUser: CreateUserDto) {
    const createdUser = await this.usersService.create(newUser);
    const payload = {
      id: createdUser.id,
      name: createdUser.name,
      lastname: createdUser.lastname,
      validate: createdUser.validated,
      avatar: createdUser.avatar,
      rol: createdUser.role.name
    }

    const token = await this.jwtService.sign(payload)


    return {
      ok: true,
      token
    };

  }

  @UseGuards(JwtAuthgGuard)
  @Get('byEmail')
  async getUserByEmail(@Body('email') email: string) {
    try {
      const user = await this.usersService.findByEmail(email);
      if (user) {
        return {
          ok: true,
          error: user,
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
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }

  @Put(':id/update-password')
  async updatePassword(
    @Param('id') id: number,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ) {
    const update = await this.usersService.updatePassword(id, updatePasswordDto);
    
    return update
  }




}


