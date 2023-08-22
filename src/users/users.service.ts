import { ConflictException, Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { AuthService } from 'src/auth/auth.service';



@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private readonly authService: AuthService
    ) { }

  async create(user: CreateUserDto) {
    const newUser = this.userRepository.create(user)
    try {
      const emailFound = await this.userRepository.findOne({
        where: {
          email: user.email
        }
      })

      if(emailFound){
        return new HttpException('Correo electronico ya existe', HttpStatus.CONFLICT)
      }

      const documentFound = await this.userRepository.findOne({
        where: {
          document: user.document
        }
      }) 
      
      if(documentFound){
        return new HttpException('El numero de documento ya existe', HttpStatus.CONFLICT)
      }
      
      newUser.password = await this.authService.hashPassword(newUser.password);
            
      return await this.userRepository.save(newUser)

    } catch (error) {
      
      throw error; // Si no es un error de duplicado específico, relanzar la excepción
    } 

  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
