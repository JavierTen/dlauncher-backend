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
    eventCreate.slug = await this.generateSlugWithAccents(eventCreate.name)
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

  async findAll() {
    try {
      const currentDate = new Date();
      currentDate.setHours(currentDate.getHours() - 5);

      const eventsToHome = await this.eventRepository.find({
        where: {post: true},
        order: { startAt: 'DESC' }
      })

      const events = eventsToHome.map( event => {
        const { id, name, slug, startAt, endsAt, shortDescription } = event;
        let status;
        if (startAt > currentDate) {
          status = 'Próximamente';
        } else if (currentDate >= startAt  &&  currentDate <= endsAt  ) {
          status = 'En curso';
        } else if (currentDate >= endsAt) {
          status = 'Finalizado';
        }

        return { id, name, slug, status, startAt, shortDescription }
      })

      return events
      
    } catch (error) {
      throw error;
    }
  }

  findAllAdmin() {
    try {
      const currentDate = new Date().toISOString();
  
      return this.eventRepository
        .createQueryBuilder('event')
        .select([
          'event.id',
          'event.name',
          'event.startAt',
          'event.endsAt',
          'event.post AS post',
          'event.slug AS slug',
          `CONCAT(SUBSTRING(event.shortDescription, 1, 400), '...') AS shortDescription`,
          `CASE
            WHEN event.startAt > :currentDate THEN 'Próximamente'
            WHEN event.endsAt >= :currentDate AND event.startAt <= :currentDate THEN 'En curso'
            WHEN event.endsAt < :currentDate THEN 'Finalizado'
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

  async findToHome() {
    try {
      const currentDate = new Date();
      currentDate.setHours(currentDate.getHours() - 5);

      const eventsToHome = await this.eventRepository.find({
        where: {post: true},
        order: { startAt: 'DESC' },
        take: 3
      })

      const events = eventsToHome.map( event => {
        const { id, name, slug, startAt, endsAt } = event;
        let status;
        if (startAt > currentDate) {
          status = 'Próximamente';
        } else if (currentDate >= startAt  &&  currentDate <= endsAt  ) {
          status = 'En curso';
        } else if (currentDate >= endsAt) {
          status = 'Finalizado';
        }

        return { id, name, slug, status, startAt }
      })

      return events
      
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
        relations: ['rubric'],
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

  async findEventRubric(id: number) {
    try {
      const findEvent = await this.eventRepository.findOne({
        where: {
          id: id
        },
        relations: ['rubric'],
      })

      if (!findEvent) {
        return {
          ok: false,
          error: 'EVENT_DOES_NOT_EXIST',
        };
      }

      const rubricId = findEvent.rubric.id;

      return {
        ok: true,
        rubric: rubricId
      };



    } catch (error) {
      return error
    }

  }

  async findOneBySlug(slug: string) {
    try {
      const findEvent = await this.eventRepository.findOne({
        where: {
          slug: slug,
          post: true
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

  async findOneBySlugAdmin(slug: string) {
    try {
      const findEvent = await this.eventRepository.findOne({
        where: {
          slug: slug
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
    return this.eventRepository.count({ where: { post: true } });
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
    event.closEvaluationAt = updateEventDto.closEvaluationAt;
    event.shortDescription = updateEventDto.shortDescription;
    event.description = updateEventDto.description;
    event.maxMembers = updateEventDto.maxMembers;
    event.post = updateEventDto.post;
    event.rubric = updateEventDto.rubric;
    event.organizerName = updateEventDto.organizerName;
    event.organizerMail = updateEventDto.organizerMail;
    event.documentUrl = updateEventDto.documentUrl;


    const update = this.eventRepository.save(event);

    return {
      ok: true,
      event: update
    }

  }

  async remove(id: number) {
    const event = await this.eventRepository.findOne({
      where: {
        id: id
      }
    });

    if (!event) {
      return false; // El usuario no existe
    }

    await this.eventRepository.remove(event);
    return true; // Usuario eliminado con éxito
  }

  //-------------GENERAR SLUG

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
