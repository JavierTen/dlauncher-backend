import { Controller, Get, Post, Body, Patch, Param, Delete, Put, NotFoundException } from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post()
  async create(@Body() createEventDto: CreateEventDto) {
    const event = await this.eventsService.create(createEventDto);
    return {
      ok: true,
      event: event.id
    };
  }

  @Get()
  findAll() {
    return this.eventsService.findAll(); 
  }

  @Get('admin')
  findAllAdmin() {
    return this.eventsService.findAllAdmin(); 
  }

  @Get('toHome') 
  findToHome() {
    return this.eventsService.findToHome();
  }

  @Get('count')
  async countEvents(): Promise<{ count: number }> {
    const count = await this.eventsService.countEvents();  
    return { count };
  } 

  @Get(':id') 
  findOne(@Param('id') id: number) { 
    return this.eventsService.findOne(id);  
  }

  @Get(':id/rubric') 
  findEventRubric(@Param('id') id: number) { 
    return this.eventsService.findEventRubric(id);  
  }

  @Get('slug/:slug') 
  findOneBySlug(@Param('slug') slug: string) { 
    return this.eventsService.findOneBySlug(slug);  
  }

  @Get('admin/slug/:slug') 
  findOneBySlugAdmin(@Param('slug') slug: string) { 
    return this.eventsService.findOneBySlugAdmin(slug);  
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateEventDto: UpdateEventDto) {
    return this.eventsService.update(+id, updateEventDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    const deleted = await this.eventsService.remove(id);

    if (!deleted) {
      throw new NotFoundException(`sección  no encontrada.`);
    }

    return { message: `sección  eliminada correctamente.` };
  }
}
