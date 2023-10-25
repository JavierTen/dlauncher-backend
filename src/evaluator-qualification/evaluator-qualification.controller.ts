import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EvaluatorQualificationService } from './evaluator-qualification.service';
import { CreateEvaluatorQualificationDto } from './dto/create-evaluator-qualification.dto';
import { UpdateEvaluatorQualificationDto } from './dto/update-evaluator-qualification.dto';

@Controller('evaluator-qualification')
export class EvaluatorQualificationController {
  constructor(private readonly evaluatorQualificationService: EvaluatorQualificationService) {}

  @Post()
  create(@Body() createEvaluatorQualificationDto: CreateEvaluatorQualificationDto) {
    try {
      return this.evaluatorQualificationService.create(createEvaluatorQualificationDto);
    } catch (error) {
      return error
    }
    
  }

  @Get()
  findAll() {
    return this.evaluatorQualificationService.findAll();
  }

  @Get(':idEvaluator/:idTeam')
  findOne(@Param('idEvaluator') idEvaluator: number, @Param('idTeam') idTeam: number) {
    return this.evaluatorQualificationService.findOne(idEvaluator, idTeam);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEvaluatorQualificationDto: UpdateEvaluatorQualificationDto) {
    return this.evaluatorQualificationService.update(+id, updateEvaluatorQualificationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.evaluatorQualificationService.remove(+id);
  }
}
