import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { CertificatesService } from './certificates.service';
import { CreateCertificateDto } from './dto/create-certificate.dto';
import { UpdateCertificateDto } from './dto/update-certificate.dto';
import { Response } from 'express';


@Controller('certificates')
export class CertificatesController {
  constructor(private readonly certificatesService: CertificatesService) {}



  @Get('/participation-certificate/:idEvent/:idUser')
  participationCertificate(@Res() res: Response,
  @Param('idEvent') idEvent: number,
  @Param('idUser') idUser: number) {
    return this.certificatesService.participationCertificate(res, idEvent, idUser);
  }

  @Get('/winner-certificate/:idEvent/:idUser')
  winnerCertificate(@Res() res: Response,
  @Param('idEvent') idEvent: number,
  @Param('idUser') idUser: number) {
    return this.certificatesService.winnerCertificate(res, idEvent, idUser);
  }


}
