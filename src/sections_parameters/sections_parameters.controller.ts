import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SectionsParametersService } from './sections_parameters.service';
import { CreateSectionsParameterDto } from './dto/create-sections_parameter.dto';
import { UpdateSectionsParameterDto } from './dto/update-sections_parameter.dto';

@Controller('sections-parameters')
export class SectionsParametersController {
  constructor(private readonly sectionsParametersService: SectionsParametersService) {}

  @Post()
  create(@Body() createSectionsParameterDto: CreateSectionsParameterDto) {
    return this.sectionsParametersService.create(createSectionsParameterDto);
  }

  @Get()
  findAll() {
    return this.sectionsParametersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sectionsParametersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSectionsParameterDto: UpdateSectionsParameterDto) {
    return this.sectionsParametersService.update(+id, updateSectionsParameterDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sectionsParametersService.remove(+id);
  }
}
