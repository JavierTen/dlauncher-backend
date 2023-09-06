import { ConflictException, Injectable, HttpException, HttpStatus, NotFoundException, BadRequestException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './entities/user.entity';
import {UsersTeamsEvents} from '../users-team-event/entities/users-team-event.entity'
import { hash } from 'bcrypt';
import { JwtService } from '@nestjs/jwt'




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

  async validateUser(userId: number, token: string, validated: boolean) {
    // Buscar el usuario por ID
    const user = await this.findOne(userId);

    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    // Verificar si el token enviado coincide con el token almacenado en la base de datos
    if (token !== user.token) {
      throw new BadRequestException('Token no válido');
    }

    // Actualizar el campo 'validated' del usuario
    user.validated = validated;

    

    // Guardar los cambios en la base de datos
    await this.updateValidate(userId, user);

    

    // Generar un nuevo token JWT con los datos del usuario validado
    const payload = {
      id: user.id,
      name: user.name,
      lastname: user.lastname,
      validated: user.validated
    };
    const newToken = this.jwtService.sign(payload);

    // Puedes retornar un objeto de respuesta que incluye el nuevo token
    return {
      ok:true,
      message: 'Usuario validado correctamente',
      token: newToken, // Aquí incluyes el nuevo token en la respuesta
    };
  }

  async findOne(id: number): Promise<Users | undefined> {
    return this.userRepository.findOne({
      where:{
        id: id
      }
    });
  }

  async updateValidate(id: number, user: Users): Promise<Users> {
    await this.userRepository.update(id, user);
    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
