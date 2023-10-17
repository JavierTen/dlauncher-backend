import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { EventEvaluatorService } from './event-evaluator.service';
import { EvaluatorDto } from './dto/create-event-evaluator.dto';
import { UpdateEventEvaluatorDto } from './dto/update-event-evaluator.dto';
import { SaveEvaluatorDto } from './dto/save-event-evaluator.dto';

@Controller('event-evaluator')
export class EventEvaluatorController {
  constructor(private readonly eventEvaluatorService: EventEvaluatorService) {}

  @Post()
  async create(@Body() createObject: SaveEvaluatorDto) {
    const event = await this.eventEvaluatorService.create(createObject);
  }

  @Get()
  findAll() {
    return this.eventEvaluatorService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventEvaluatorService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEventEvaluatorDto: UpdateEventEvaluatorDto) {
    return this.eventEvaluatorService.update(+id, updateEventEvaluatorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eventEvaluatorService.remove(+id);
  }
}
