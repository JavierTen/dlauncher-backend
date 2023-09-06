import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MunicipalityDto } from './dto/municipality.dto';
import { CreateMunicipalityDto } from './dto/create-municipality.dto';
import { UpdateMunicipalityDto } from './dto/update-municipality.dto';
import { Municipality } from './entities/municipality.entity';

@Injectable()
export class MunicipalityService {

  constructor(
    @InjectRepository(Municipality)
    private readonly municipalityRepository: Repository<Municipality>,
  ) {}

  async getMunicipalitiesWithDepartments(): Promise<Municipality[]> {
    return this.municipalityRepository.find({ relations: ['department'] });
  }


  create(createMunicipalityDto: CreateMunicipalityDto) {
    return 'This action adds a new municipality';
  }

  findAll() {
    return `This action returns all municipality`;
  }

  findOne(id: number) {
    return `This action returns a #${id} municipality`;
  }

  update(id: number, updateMunicipalityDto: UpdateMunicipalityDto) {
    return `This action updates a #${id} municipality`;
  }

  remove(id: number) {
    return `This action removes a #${id} municipality`;
  }
}
