import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { EvaluatorDto } from './dto/create-event-evaluator.dto';
import { UpdateEventEvaluatorDto } from './dto/update-event-evaluator.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { EventEvaluator } from './entities/event-evaluator.entity';
import { Repository } from 'typeorm';
import { Events } from 'src/events/entities/event.entity';
import { Users } from 'src/users/entities/user.entity';
import { SaveEvaluatorDto } from './dto/save-event-evaluator.dto';

@Injectable()
export class EventEvaluatorService {

  constructor(
    @InjectRepository(EventEvaluator) private evaluatorRepository: Repository<EventEvaluator>,
    @InjectRepository(Events) private eventRepository: Repository<Events>,
    @InjectRepository(Users) private userRepository: Repository<Users>
  ) { }

  async create(createObject) {
    console.log(createObject)
    const { user, event } = await createObject;
    for (const evaluatorId of user) {
        const data = {
          user:  evaluatorId,
          event
        }
        const evaluator  = this.evaluatorRepository.create(data);
        await this.evaluatorRepository.save(evaluator);
    }
    return {
      ok: true
    }
    
  }

  async add(createObject) {
    
    const evaluator  = this.evaluatorRepository.create(createObject);
    await this.evaluatorRepository.save(evaluator);
    
    return {
      ok: true
    }
    
  }

  findAll() {
    return `This action returns all eventEvaluator`;
  }

  async findOne(id: number) {
    try {
      const evaluators = await this.evaluatorRepository.find({
        where: {
          event: {
            id: id
          } 
        },
      })

      if(!evaluators){
        return {
          ok: false,
          error: 'EVENT_DOES_NOT_EXIST',
        };
      }


      return {
        ok: true,
        event: evaluators
      };


    } catch (error) {
      return error
    }
    return `This action returns a #${id} eventEvaluator`;
  }

  async findEventsEvaluator(id: number) {
    try {
      const eventsEvaluator = await this.evaluatorRepository.find({
        where: {
          user: {
            id: id
          } 
        },order: {createdAt : 'DESC' }
        
      })
  
      // Utiliza el método map para extraer solo los objetos 'event'.
      const eventObjects = eventsEvaluator.map(item => item.event);
  
      // Utiliza el método filter para eliminar elementos 'undefined'.
      const events = eventObjects.filter(event => event !== undefined);

      
      /*const event = data.map( data => {

      })*/
  
      if (events.length === 0) {
        return {
          ok: false,
          error: 'EVENT_DOES_NOT_EXIST',
        };
      }

      const eventsE = events.map(event => {
        const { id, name, slug ,startAt, endsAt } = event;
        const currentDate = new Date();
        currentDate.setHours(currentDate.getHours() - 5);

        let status;
    
        if (startAt > currentDate) {
          status = 'Próximamente';
        } else if (currentDate >= startAt  &&  currentDate <= endsAt  ) {
          status = 'En curso';
        } else if (currentDate >= endsAt) {
          status = 'Finalizado';
        }
    
        return { id, name, slug, status, startAt  };
    });

      
      return {
        ok: true,
        events: eventsE
      };
    } catch (error) {
      return error;
    }
  }
  

  update(id: number, updateEventEvaluatorDto: UpdateEventEvaluatorDto) {
    return `This action updates a #${id} eventEvaluator`;
  }

  async remove(idUser: number, eventId: number) {
    const user = await this.evaluatorRepository.findOne({
      where: {
        user: {
          id: idUser
        },
        event:{
          id: eventId
        }
      }
    });

    if (!user) {
      return false; // El usuario no existe
    }

    await this.evaluatorRepository.remove(user);
    return true;
  }
}
