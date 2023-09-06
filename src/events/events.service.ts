import { Injectable } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Events } from './entities/event.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class EventsService {
  constructor(@InjectRepository(Events) private eventRepository: Repository<Events>,
  ){  }
  
  create(createEventDto: CreateEventDto) {
    return 'This action adds a new event';
  }

  findAll() {
    return `This action returns all events`;
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

  update(id: number, updateEventDto: UpdateEventDto) {
    return `This action updates a #${id} event`;
  }

  remove(id: number) {
    return `This action removes a #${id} event`;
  }
}
