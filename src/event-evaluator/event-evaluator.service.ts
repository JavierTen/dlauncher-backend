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
    const evaluator  = this.evaluatorRepository.create(createObject)
    return await this.evaluatorRepository.save(evaluator);
  }

  findAll() {
    return `This action returns all eventEvaluator`;
  }

  findOne(id: number) {
    return `This action returns a #${id} eventEvaluator`;
  }

  update(id: number, updateEventEvaluatorDto: UpdateEventEvaluatorDto) {
    return `This action updates a #${id} eventEvaluator`;
  }

  remove(id: number) {
    return `This action removes a #${id} eventEvaluator`;
  }
}
