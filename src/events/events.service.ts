import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Events } from './entities/event.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class EventsService {
  constructor(@InjectRepository(Events) private eventRepository: Repository<Events>,
  ) { }

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
      const currentDate = new Date().toISOString();
  
      return this.eventRepository
        .createQueryBuilder('event')
        .select([
          'event.id',
          'event.name',
          'event.startAt',
          'event.endsAt',
          `CONCAT(SUBSTRING(event.description, 1, 400), '...') AS description`,
          `CASE
            WHEN event.startAt > :currentDate THEN 1
            WHEN event.endsAt >= :currentDate AND event.startAt <= :currentDate THEN 2
            WHEN event.endsAt < :currentDate THEN 3
            ELSE NULL
          END AS status`,
        ])
        .orderBy('event.id', 'DESC')
        .setParameter('currentDate', currentDate)
        .getRawMany();
    } catch (error) {
      throw error;
    }
  }




  findToHome() {
    try {
      const currentDate = new Date().toISOString();
  
      return this.eventRepository
        .createQueryBuilder('event')
        .select([
          'event.id',
          'event.name',
          'event.startAt',
          'event.endsAt',
          `CONCAT(SUBSTRING(event.description, 1, 400), '...') AS description`,
          `CASE
            WHEN event.startAt > :currentDate THEN 1
            WHEN event.endsAt >= :currentDate AND event.startAt <= :currentDate THEN 2
            WHEN event.endsAt < :currentDate THEN 3
            ELSE NULL
          END AS status`,
        ])
        .orderBy('event.id', 'DESC')
        .setParameter('currentDate', currentDate)
        .take(3)
        .getRawMany();
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

      if (!findEvent) {
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

  async update(id: number, updateEventDto: UpdateEventDto) {
    const event = await this.eventRepository.findOne({
      where: {
        id: id
      }
    });

    if (!event) {
      throw new NotFoundException('Evento no encontrado');
    }

    event.name = updateEventDto.name
    event.startAt = updateEventDto.startAt;
    event.closeAt = updateEventDto.closeAt;
    event.endsAt = updateEventDto.endsAt;
    event.description = updateEventDto.description;
    event.maxMembers = updateEventDto.maxMembers;
    event.post = updateEventDto.post;

    const update = this.eventRepository.save(event);

    return {
      ok: true,
      event
    }

  }

  remove(id: number) {
    return `This action removes a #${id} event`;
  }
}
