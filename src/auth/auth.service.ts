import { HttpException, Injectable } from '@nestjs/common';

import { LoginAuthDto } from './dto/login-auth.dto';
import { UsersService } from 'src/users/users.service';
import { Users } from 'src/users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(Users) private userRepository: Repository<Users>,
    private jwtService: JwtService
  ) { }

  async login(userObjectLogin: LoginAuthDto) {
    const { email, password } = userObjectLogin;
    
    const findUser = await this.userRepository.findOne({
      where: {
        email: email
      }
    }) 
    if(!findUser) throw new HttpException ('USER_NOT_FOUND',404);

    const checkPassword = await compare(password, findUser.password);
    if(!checkPassword) throw new HttpException ('PASSWORD_INCORRECT', 403)

    const payload = {
      id: findUser.id,
      name: findUser.name,
      lastname: findUser.lastname,
      validate: findUser.validated
    }
    const token = await this.jwtService.sign(payload)

    const data = {
      ok: true,
      token
    };

    return data;


  }



}
 

