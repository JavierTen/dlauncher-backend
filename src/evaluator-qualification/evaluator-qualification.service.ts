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
      const newQualification = this.qualificationRepository.create(qualificationEval)
      const qualification = await this.qualificationRepository.save(newQualification)
      const update = await this.updateScore(qualificationEval.team, qualificationEval.event ,qualificationEval)
      return {
        ok: true,
        qualification,
        scoreTeam: update
      }
    } catch (error) {
      return error
    }

  }

  async updateScore(idTeam: number, IdEvent:number ,updateTeamDto: UpdateTeamDto) {
    try {
     
      const evaluates = await this.qualificationRepository.find({   
        where: {
          team: {id: idTeam},
          event: {id: IdEvent}
        }
      });

      const score = evaluates.reduce((accumulator, currentValue) => accumulator + currentValue.score, 0);
      const totalScore = score / evaluates.length;

      const team = await this.teamRepository.findOne({
        where: {
          id: idTeam
        }
      });

      if (!team) {
        throw new NotFoundException('Equipo no encontrado');
      }

      if (updateTeamDto.score) { 
        team.score = totalScore;
      }
      
      this.teamRepository.save(team);
      return {
        totalScore
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
