import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRubricsSectionDto } from './dto/create-rubrics_section.dto';
import { UpdateRubricsSectionDto } from './dto/update-rubrics_section.dto';
import { Repository } from 'typeorm';
import { RubricsSection } from './entities/rubrics_section.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class RubricsSectionsService {

  constructor(@InjectRepository(RubricsSection) private sectionRepository: Repository<RubricsSection>,
  ) { }


  async create(createSection: CreateRubricsSectionDto) {
    
    try {
      const section = this.sectionRepository.create(createSection);
      return await this.sectionRepository.save(section);
    } catch (error) {
      throw error;
    }

    

  }

  async findByRubricId(rubricId: number) {
    try {
      const sections = await this.sectionRepository.find({
        where: {
          rubric: {id: rubricId}
        }
      })

      if (!sections) {
        return {
          ok: false,
          error: 'SECTIONS_DOES_NOT_EXIST',
        };
      }

      return {
        ok: true,
        sections
      };



    } catch (error) {
      return error
    }

  }

  findAll() {
    return `This action returns all rubricsSections`;
  }

  findOne(id: number) {
    return `This action returns a #${id} rubricsSection`;
  }

  async update(id: number, updateRubricsSectionDto: UpdateRubricsSectionDto) {
    try {
      const section = await this.sectionRepository.findOne({
        where: {
          id: id
        }
      });

      if (!section) {
        throw new NotFoundException(`Sección con ID ${id} no encontrada`);
      }
  
      Object.assign(section, updateRubricsSectionDto);

      await this.sectionRepository.save(section);

      return section;

    } catch (error) {
      throw error
    }
  }

  async remove(id: number) {
    const section = await this.sectionRepository.findOne({
      where: {
        id: id
      }
    });

    if (!section) {
      return false; // El usuario no existe
    }

    await this.sectionRepository.remove(section);
    return true; // Usuario eliminado con éxito
  }
}


