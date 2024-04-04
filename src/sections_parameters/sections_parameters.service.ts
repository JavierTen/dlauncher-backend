import { Injectable } from '@nestjs/common';
import { CreateSectionsParameterDto } from './dto/create-sections_parameter.dto';
import { UpdateSectionsParameterDto } from './dto/update-sections_parameter.dto';

@Injectable()
export class SectionsParametersService {
  create(createSectionsParameterDto: CreateSectionsParameterDto) {
    return 'This action adds a new sectionsParameter';
  }

  findAll() {
    return `This action returns all sectionsParameters`;
  }

  findOne(id: number) {
    return `This action returns a #${id} sectionsParameter`;
  }

  update(id: number, updateSectionsParameterDto: UpdateSectionsParameterDto) {
    return `This action updates a #${id} sectionsParameter`;
  }

  remove(id: number) {
    return `This action removes a #${id} sectionsParameter`;
  }
}
