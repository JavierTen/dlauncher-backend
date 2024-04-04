import { Module } from '@nestjs/common';
import { SectionsParametersService } from './sections_parameters.service';
import { SectionsParametersController } from './sections_parameters.controller';

@Module({
  controllers: [SectionsParametersController],
  providers: [SectionsParametersService]
})
export class SectionsParametersModule {}
