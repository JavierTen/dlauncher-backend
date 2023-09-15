import { ConflictException, Injectable, HttpException, HttpStatus, NotFoundException, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './entities/user.entity';
import {UsersTeamsEvents} from '../users-team-event/entities/users-team-event.entity'
import { hash, compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt'
import { UpdatePasswordDto } from './dto/update-password.dto';




@Injectable()
export class UsersService {


  constructor(
    @InjectRepository(Users) private userRepository: Repository<Users>,
    @InjectRepository(UsersTeamsEvents) private uteRepository: Repository<UsersTeamsEvents>,
    private jwtService: JwtService
  ) { }

  async create(user: CreateUserDto) {
    const newUser = this.userRepository.create(user)
    try {
      const emailFound = await this.userRepository.findOne({
        where: {
          email: user.email
        }
      })
      const documentFound = await this.userRepository.findOne({
        where: {
          document: user.document
        }
      })

      if (emailFound && documentFound) {
        throw new HttpException({
          ok: false,
          error: 'EMAIL_DOCUMENT_CONFLICT'
        }, HttpStatus.CONFLICT);
      }

      if (emailFound) {
        throw new HttpException({
          ok: false,
          error: 'EMAIL_CONFLICT'
        }, HttpStatus.CONFLICT);
      }

      if (documentFound) {
        throw new HttpException({
          ok: false,
          error: 'DOCUMENT_CONFLICT'
        }, HttpStatus.CONFLICT);
      }

      newUser.password = await hash(newUser.password, 10)



      await this.userRepository.save(newUser)

      return newUser

    } catch (error) {

      throw error;
    }

  }

  async findAll(): Promise<Users[]> {
    try {
      return this.userRepository.find();
    } catch (error) {
      throw error;
    }

  }

  async findByEmail(mail): Promise<Users | undefined> {
    try {
      const emailFound = await this.userRepository.findOne({
        where: {
          email: mail
        }
      })
      return emailFound

    } catch (error) {
      return error
    }

  }

  async findById(idUser: number): Promise<Users | undefined> {
    try {
      const user = await this.userRepository.findOne({
        where: {
          id: idUser
        }

      })

      if(user){
        user.password = null;
        user.token = null;
      }
      return user

    } catch (error) {
      return error
    }

  }

  async findUserEvents(idUser) {    
    try {
      const usuario = await this.uteRepository.find({
        where: {
          user: { id: idUser },        
         },
        relations: ['user', 'team.event'] // Cargar relaciones necesarias
      });
     
      if(usuario.length == 0){
        return{
          ok: false,
          msg: 'NO_EVENTS'
        };
      }
  
      const events = usuario.map(ute => ute.team.event)
      
  
      return events
      
    } catch (error) {
        return error
    }
    
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto): Promise<Users> {
    const user = await this.userRepository.findOne({
      where: {
        id: id
      }
    });

    if (!user) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }

    // Actualizamos los campos proporcionados en updateUserDto
    Object.assign(user, updateUserDto);

    // Guardamos los cambios en la base de datos
    await this.userRepository.save(user);

    

    return user;

  }

  async updatePassword(id: number, updatePasswordDto: UpdatePasswordDto) {
    const user = await this.userRepository.findOne({
      where:{
        id: id
      }
    });

    if (!user) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }

    // Verificar si la contraseña anterior es correcta
    const isPasswordValid = await compare(
      updatePasswordDto.oldPassword,
      user.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Contraseña anterior incorrecta');
    }

    // Cifrar la nueva contraseña
    const hashedPassword = await hash(updatePasswordDto.newPassword, 10);

    // Actualizar la contraseña en el usuario
    user.password = hashedPassword;

    // Guardar los cambios en la base de datos
    await this.userRepository.save(user);

    return {
      ok: true,
      msg: 'Contraseña cambiada'
    }

  }


  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
