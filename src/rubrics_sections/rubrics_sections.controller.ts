import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
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

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRubricsSectionDto: UpdateRubricsSectionDto) {
    return this.rubricsSectionsService.update(+id, updateRubricsSectionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rubricsSectionsService.remove(+id);
  }
}
