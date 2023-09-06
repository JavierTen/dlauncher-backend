import { Injectable } from '@nestjs/common';
import { CreateDocumentTypeDto } from './dto/create-document-type.dto';
import { UpdateDocumentTypeDto } from './dto/update-document-type.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DocumentType } from './entities/document-type.entity';

@Injectable()
export class DocumentTypeService {

  constructor(
    @InjectRepository(DocumentType)
    private readonly documentTypeRepository: Repository<DocumentType>,
  ) {}

  async getDocumentTypes(): Promise<DocumentType[]> {
    return this.documentTypeRepository.find();
  }

  create(createDocumentTypeDto: CreateDocumentTypeDto) {
    return 'This action adds a new documentType';
  }

  findAll() {
    return `This action returns all documentType`;
  }

  findOne(id: number) {
    return `This action returns a #${id} documentType`;
  }

  update(id: number, updateDocumentTypeDto: UpdateDocumentTypeDto) {
    return `This action updates a #${id} documentType`;
  }

  remove(id: number) {
    return `This action removes a #${id} documentType`;
  }
}
