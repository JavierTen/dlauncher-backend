import { Injectable } from '@nestjs/common';
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

  update(id: number, updateSectionsParameterDto: UpdateSectionsParameterDto) {
    return `This action updates a #${id} sectionsParameter`;
  }

  remove(id: number) {
    return `This action removes a #${id} sectionsParameter`;
  }
}
