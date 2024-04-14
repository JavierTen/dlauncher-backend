import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateRubricDto } from './dto/create-rubric.dto';
import { UpdateRubricDto } from './dto/update-rubric.dto';
import { Rubric } from './entities/rubric.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class RubricsService {

  constructor(@InjectRepository(Rubric) private rubricRepository: Repository<Rubric>,
  ) { }
  async create(createRubric: CreateRubricDto) {

    createRubric.slug = await this.generateSlugWithAccents(createRubric.name)
    const rubric = this.rubricRepository.create(createRubric);


    try {
      const name = await this.rubricRepository.findOne({
        where: {
          name: createRubric.name
        }
      })

      if (name) {
        throw new HttpException({
          ok: false,
          error: 'NAME_CONFLICT'
        }, HttpStatus.CONFLICT);
      }

      
    } catch (error) {
      throw error;
    }

    return await this.rubricRepository.save(rubric);
  }
  
  async findAll() {
    try {
      const rubrics = await this.rubricRepository.find({ 
        order: {
          id: 'DESC', // Ordenar por la columna 'id' en orden descendente
        }           
      })

     

      if (rubrics.length == 0) {
        return {
          ok: false,
          error: 'NO_RUBRICS',
        };
      }

      return {
        ok: true,
        rubrics
      };



    } catch (error) {
      return error
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} rubric`;
  }

  async findByRubricId(id: number) {
    try {
      const rubric = await this.rubricRepository.findOne({
        where: {
          id
        },
        relations: ['sections', 'sections.parameters'],
      })

      if (!rubric) {
        return {
          ok: false,
          error: 'RUBRIC_DOES_NOT_EXIST',
        };
      }

      return {
        ok: true,
        rubric
      };



    } catch (error) {
      return error
    }

  }


  async update(id: number, updateRubric: UpdateRubricDto) {
    const rubric = await this.rubricRepository.findOne({
      where: {
        id: id
      }
    });

    const name = await this.rubricRepository.findOne({
      where: {
        name: updateRubric.name
      }
    });

    if(name != null){
      if (name.id != id) {
        throw new HttpException({
          ok: false,
          error: 'NAME_CONFLICT'
        }, HttpStatus.CONFLICT);
      }
    }

    

    if (!rubric) {
      throw new NotFoundException('Rubrica no encontrada');
    }
    
    rubric.name = updateRubric.name;
    rubric.slug = await this.generateSlugWithAccents(updateRubric.name);

    this.rubricRepository.save(rubric);

    return {
      ok: true,
      update: rubric
    }

  }

  async remove(id: number) {
    const rubric = await this.rubricRepository.findOne({
      where: {
        id: id
      }
    });

    if (!rubric) {
      return false; // El usuario no existe
    }

    await this.rubricRepository.remove(rubric);
    return true; // Usuario eliminado con éxito
  }

  async generateSlug(text: string): Promise<string> {
    // Reemplazar caracteres especiales y espacios con guiones
    const slug = text
      .toLowerCase() // Convertir el texto a minúsculas
      .replace(/[^\w\s-]/g, '') // Remover caracteres especiales excepto guiones
      .replace(/\s+/g, '-') // Reemplazar espacios con guiones
      .replace(/--+/g, '-') // Reemplazar múltiples guiones con uno solo
      .trim(); // Remover espacios en blanco al principio y al final
  
    return slug;
  }

  async keepAccents(text: string): Promise<string> {
    // Mantener letras con acentos reemplazando los caracteres especiales
    const withAccents = {
      'á': 'a', 'é': 'e', 'í': 'i', 'ó': 'o', 'ú': 'u', 'ü': 'u',
      'Á': 'A', 'É': 'E', 'Í': 'I', 'Ó': 'O', 'Ú': 'U', 'Ü': 'U'
    };
  
    return text.replace(/[áéíóúüÁÉÍÓÚÜ]/g, match => withAccents[match]);
  }

  async generateSlugWithAccents(text: string): Promise<string> {
    const cleanedText = await this.keepAccents(text); // Mantener letras con acentos
    const slug = await this.generateSlug(cleanedText); // Generar slug sin caracteres especiales
    return slug;
  }



}
