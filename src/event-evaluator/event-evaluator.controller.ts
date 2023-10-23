import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { EventEvaluatorService } from './event-evaluator.service';
import { EvaluatorDto } from './dto/create-event-evaluator.dto';
import { UpdateEventEvaluatorDto } from './dto/update-event-evaluator.dto';
import { SaveEvaluatorDto } from './dto/save-event-evaluator.dto';

@Controller('event-evaluator')
export class EventEvaluatorController {
  constructor(private readonly eventEvaluatorService: EventEvaluatorService) {}

  @Post('add-evaluator-event')
  async add(@Body() createObject: EvaluatorDto) {
    try {
      const event = await this.eventEvaluatorService.add(createObject);
      return event
    } catch (error) {
      throw new HttpException(
        {
          ok: false          
        },
        HttpStatus.BAD_REQUEST
      );
    }
    
    return event
    
  }


  @Post()
  async create(@Body() createObject: SaveEvaluatorDto) {
    try {
      const event = await this.eventEvaluatorService.create(createObject);
      return event
    } catch (error) {
      throw new HttpException(
        {
          ok: false          
        },
        HttpStatus.BAD_REQUEST
      );
    }
    
    return event
    
  }

  @Get()
  findAll() {
    return this.eventEvaluatorService.findAll();
  }

  @Get('events/:id')
  findEventsEvaluator(@Param('id') id: number) {
    return this.eventEvaluatorService.findEventsEvaluator(id);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.eventEvaluatorService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEventEvaluatorDto: UpdateEventEvaluatorDto) {
    return this.eventEvaluatorService.update(+id, updateEventEvaluatorDto);
  }

  @Delete(':idUser/:idEvent')
  remove(@Param('idUser') userId: string, @Param('idEvent') eventId: string) {
    return this.eventEvaluatorService.remove(+userId,+eventId);
  }
}
