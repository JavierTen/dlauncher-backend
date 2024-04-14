import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSectionsParameterDto } from './dto/create-sections_parameter.dto';
import { UpdateSectionsParameterDto } from './dto/update-sections_parameter.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { SectionsParameter } from './entities/sections_parameter.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SectionsParametersService {

  constructor(@InjectRepository(SectionsParameter) private parametersRepository: Repository<SectionsParameter>,
  ) { }
  async create(createParameter: CreateSectionsParameterDto) {
    try {
      const section = this.parametersRepository.create(createParameter);
      return await this.parametersRepository.save(section);
    } catch (error) {
      throw error;
    }
  }

  findAll() {
    return `This action returns all sectionsParameters`;
  }

  findOne(id: number) {
    return `This action returns a #${id} sectionsParameter`;
  }

  async update(id: number, updateSectionsParameterDto: UpdateSectionsParameterDto) {

    try {
      const parameter = await this.parametersRepository.findOne({
        where: {
          id: id
        }
      });

      if (!parameter) {
        throw new NotFoundException(`Parametro con ID ${id} no encontrado`);
      }
  
      Object.assign(parameter, updateSectionsParameterDto);

      await this.parametersRepository.save(parameter);

      return parameter;

    } catch (error) {
      throw error
    }

  }

  async remove(id: number) {
    const parameter = await this.parametersRepository.findOne({
      where: {
        id: id
      }
    });

    if (!parameter) {
      return false; // El usuario no existe
    }

    await this.parametersRepository.remove(parameter);
    return true; // Usuario eliminado con éxito
  }
}
