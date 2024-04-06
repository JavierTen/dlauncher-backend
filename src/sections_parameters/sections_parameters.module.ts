import { Module } from '@nestjs/common';
import { SectionsParametersService } from './sections_parameters.service';
import { SectionsParametersController } from './sections_parameters.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SectionsParameter } from './entities/sections_parameter.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SectionsParameter])],
  controllers: [SectionsParametersController],
  providers: [SectionsParametersService],
  exports: [TypeOrmModule]
})
export class SectionsParametersModule {}
