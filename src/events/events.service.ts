import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Events } from './entities/event.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class EventsService {
  constructor(@InjectRepository(Events) private eventRepository: Repository<Events>,
  ){  }
  
  async create(eventCreate: CreateEventDto) {
    const event = this.eventRepository.create(eventCreate);

    try {
      const name = await this.eventRepository.findOne({
        where: {
          name: eventCreate.name
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
    
    return await this.eventRepository.save(event);
  }

  findAll() {
    try {
      return this.eventRepository.find({        
        order: {
          id: 'DESC', // Ordenar por la columna 'id' en orden descendente
        }
      });
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: number) {
    try {
      const findEvent = await this.eventRepository.findOne({
        where: {
          id: id
        },
      })

      if(!findEvent){
        return {
          ok: false,
          error: 'EVENT_DOES_NOT_EXIST',
        };
      }

      return {
        ok: true,
        event: findEvent
      };


      
    } catch (error) {
      return error
    }
    
  }

  async countEvents(): Promise<number> {
    return this.eventRepository.count();
  }

  update(id: number, updateEventDto: UpdateEventDto) {
    return `This action updates a #${id} event`;
  }

  remove(id: number) {
    return `This action removes a #${id} event`;
  }
}
