import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { RubricsService } from './rubrics.service';
import { CreateRubricDto } from './dto/create-rubric.dto';
import { UpdateRubricDto } from './dto/update-rubric.dto';

@Controller('rubrics')
export class RubricsController {
  constructor(private readonly rubricsService: RubricsService) {}

  @Post()
  create(@Body() createRubricDto: CreateRubricDto) {
    return this.rubricsService.create(createRubricDto);
  }

  @Get()
  findAll() {
    return this.rubricsService.findAll();
  }

  @Get(':id') 
  findByRubricId(@Param('id') id: number) { 
    return this.rubricsService.findByRubricId(id);  
  }

  /*@Get(':id')
  findOne(@Param('id') id: string) {
    return this.rubricsService.findOne(+id);
  }*/

  @Put(':slug')
  update(@Param('slug') slug: string, @Body() updateRubricDto: UpdateRubricDto) {
    return this.rubricsService.update(slug, updateRubricDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.rubricsService.remove(id);
  }
}
