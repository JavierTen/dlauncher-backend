import { Module } from '@nestjs/common';
import { MunicipalityService } from './municipality.service';
import { MunicipalityController } from './municipality.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Department } from 'src/departament/entities/departament.entity';
import { Municipality } from './entities/municipality.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Department, Municipality])],
  controllers: [MunicipalityController],
  providers: [MunicipalityService]
})
export class MunicipalityModule {}
