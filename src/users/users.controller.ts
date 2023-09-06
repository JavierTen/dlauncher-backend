import { Controller, Get, Post, Body, Patch, Param, Delete, Query, HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthgGuard } from 'src/auth/auth.guard';
import { JwtService } from '@nestjs/jwt'
import * as nodemailer from 'nodemailer';


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
      validate: createdUser.validated
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

  @Get('events/:idUser')
  find(@Param('idUser') idUser: number) {
    
    return this.usersService.findUserEvents(idUser);
  }

  @Post('validate/:id')
  async validateUser(@Param('id') id: string, @Body() { token, validated }: { token: string; validated: boolean }) {
    return this.usersService.validateUser(+id, token, validated);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }

  




}


