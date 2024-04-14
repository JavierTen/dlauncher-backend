import { Controller, Get, Post, Body, Patch, Param, Delete, Put, NotFoundException } from '@nestjs/common';
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

  @Put(':id')
  update(@Param('id') id: number, @Body() updateRubricDto: UpdateRubricDto) {
    return this.rubricsService.update(id, updateRubricDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    const deleted = await this.rubricsService.remove(id);

    if (!deleted) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado.`);
    }

    return { message: `Usuario con ID ${id} eliminado correctamente.` };
  }
}
