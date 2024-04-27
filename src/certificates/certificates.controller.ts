import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { CertificatesService } from './certificates.service';
import { CreateCertificateDto } from './dto/create-certificate.dto';
import { UpdateCertificateDto } from './dto/update-certificate.dto';
import { Response } from 'express';


@Controller('certificates')
export class CertificatesController {
  constructor(private readonly certificatesService: CertificatesService) {}



  @Get(':idEvent/:idUser')
  participationCertificate(
  @Param('idEvent') idEvent: number,
  @Param('idUser') idUser: number) {
    return this.certificatesService.certificate(idEvent, idUser);
  }



}
