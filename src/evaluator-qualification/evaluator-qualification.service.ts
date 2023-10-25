import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEvaluatorQualificationDto } from './dto/create-evaluator-qualification.dto';
import { UpdateEvaluatorQualificationDto } from './dto/update-evaluator-qualification.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { EvaluatorQualification } from './entities/evaluator-qualification.entity';
import { Repository } from 'typeorm';
import { Teams } from 'src/teams/entities/team.entity';
import { UpdateTeamDto } from 'src/teams/dto/update-team.dto';
import { EventEvaluator } from 'src/event-evaluator/entities/event-evaluator.entity';

@Injectable()
export class EvaluatorQualificationService {

  constructor(
    @InjectRepository(EvaluatorQualification) private qualificationRepository: Repository<EvaluatorQualification>,
    @InjectRepository(Teams) private teamRepository: Repository<Teams>,
    @InjectRepository(EventEvaluator) private eventEvaluatorRepository: Repository<EventEvaluator>

  ) { }


  async create(qualificationEval) {
    try {
      const data = {
        team: qualificationEval.teamId,
        user: qualificationEval.userId,
        score: qualificationEval.score,
        event: qualificationEval.eventId
      }


      await this.updateScore(qualificationEval.team, qualificationEval)
      const newQualification = this.qualificationRepository.create(qualificationEval)
      const qualification = await this.qualificationRepository.save(newQualification)
      return {
        ok: true,
        qualification
      }
    } catch (error) {
      return error
    }

  }

  async updateScore(id: number, updateTeamDto: UpdateTeamDto) {
    try {
      console.log(updateTeamDto.event)

      const event = await this.eventEvaluatorRepository.find({
        where: {
          event: { id: updateTeamDto.event }
        },
      });
      console.log("numbers evaluators: ", event.length)
      if (!event) {
        throw new NotFoundException('Evento no encontrado');
      }

      const team = await this.teamRepository.findOne({
        where: {
          id: id
        }
      });

      if (!team) {
        throw new NotFoundException('Equipo no encontrado');
      }

      if (updateTeamDto.score) {
        const factor = 1 / event.length;
        const nota = updateTeamDto.score * factor;
        team.score += nota;
      }

      const update = this.teamRepository.save(team);
      return {
        ok: true,
        update
      }

    } catch (error) {
      return error
    }



  }

  findAll() {
    return `This action returns all evaluatorQualification`;
  }

  async findOne(idEvaluator: number, idTeam: number) {
    try {      
      const evaluated = await this.qualificationRepository.findOne({
        where: {
          team: { id: idTeam },
          user: {id: idEvaluator}
        }
      });
      
      if(!evaluated){
        return{
          evaluated: false
        }
      }
      return{
        evaluated: true,
        score: evaluated.score
      }

    } catch (error) {
      return error
    }
    return `This action returns a #${idEvaluator} evaluatorQualification`;
  }

  update(id: number, updateEvaluatorQualificationDto: UpdateEvaluatorQualificationDto) {
    return `This action updates a #${id} evaluatorQualification`;
  }

  remove(id: number) {
    return `This action removes a #${id} evaluatorQualification`;
  }
}
