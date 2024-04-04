import { Module } from '@nestjs/common';
import { RubricsService } from './rubrics.service';
import { RubricsController } from './rubrics.controller';
import { Rubric } from './entities/rubric.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Rubric])],
  controllers: [RubricsController],
  providers: [RubricsService],
  exports: [TypeOrmModule]
})
export class RubricsModule {}
