import { Module } from '@nestjs/common';
import { RubricsSectionsService } from './rubrics_sections.service';
import { RubricsSectionsController } from './rubrics_sections.controller';
import { RubricsSection } from './entities/rubrics_section.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([RubricsSection])],
  controllers: [RubricsSectionsController],
  providers: [RubricsSectionsService],
  exports: [TypeOrmModule]
})
export class RubricsSectionsModule {}
