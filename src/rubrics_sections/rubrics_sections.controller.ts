import { Controller, Get, Post, Body, Patch, Param, Delete, Put, NotFoundException } from '@nestjs/common';
import { RubricsSectionsService } from './rubrics_sections.service';
import { CreateRubricsSectionDto } from './dto/create-rubrics_section.dto';
import { UpdateRubricsSectionDto } from './dto/update-rubrics_section.dto';

@Controller('rubrics-sections')
export class RubricsSectionsController {
  constructor(private readonly rubricsSectionsService: RubricsSectionsService) {}

  @Post()
  create(@Body() createRubricsSectionDto: CreateRubricsSectionDto) {
    return this.rubricsSectionsService.create(createRubricsSectionDto);
  }

  @Get()
  findAll() {
    return this.rubricsSectionsService.findAll();
  }

  /*@Get(':id')
  findOne(@Param('id') id: string) {
    return this.findOne(+id);
  }*/

  @Get('rubric/:rubricId') 
  findByRubricId(@Param('rubricId') rubricId: number) { 
    return this.rubricsSectionsService.findByRubricId(rubricId);  
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateRubricsSectionDto: UpdateRubricsSectionDto) {
    return this.rubricsSectionsService.update(id, updateRubricsSectionDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    const deleted = await this.rubricsSectionsService.remove(id);

    if (!deleted) {
      throw new NotFoundException(`sección  no encontrada.`);
    }

    return { message: `sección  eliminada correctamente.` };
  }
}
