import { Injectable } from '@nestjs/common';

import * as pdf from 'html-pdf';

import { Response } from 'express';
import { Events } from 'src/events/entities/event.entity';
import { Users } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CertificatesService {

  constructor(
    @InjectRepository(Users) private userRepository: Repository<Users>,
    @InjectRepository(Events) private eventRepository: Repository<Events>,
  ) { }

  async participationCertificate(res: Response, idEvent: number, idUser: number) {
    //const doc = new PDFDocument();

    try {
      const user = await this.userRepository.findOne({
        where: {
          id: idUser
        }
      })

      const event = await this.eventRepository.findOne({
        where: {
          id: idEvent
        }
      })

      const name = user.name;
      const lastname = user.lastname;

      const namEvent = event.name;
      const date = event.startAt
      const nameOrganizer = event.organizerName;

      const currentDate = date;

      // Obtener el nombre del mes
      const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
        "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
      const monthName = monthNames[currentDate.getMonth()];

      // Obtener el día y el año
      const day = currentDate.getDate();
      const year = currentDate.getFullYear();

      // Construir la cadena de fecha en el formato deseado
      const formattedDate = `${monthName} ${day} de ${year}`;


      // Genera el contenido HTML y CSS
      const htmlContent = `<!DOCTYPE html>
      <html>
      
      <head>
          <link rel="preconnect" href="https://fonts.googleapis.com">
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
          <link href="https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap" rel="stylesheet">
          <style>
              
      
              body {
                  margin: 0;
                  background-image: url("https://i.ibb.co/dkThk17/Certificado-copia-page-0001.jpg");
                  background-repeat: no-repeat;
                  background-size: cover;
                  font-family: Arial, sans-serif;
                  color: black;
                  width: 430mm;
                  height: 222.646mm;
              }
      
              .certificate {
                  padding: 100px;
                  margin-top: 80px;
                  text-align: center;
              }
      
      
      
              .titulo-uni {
                  font-size: 40px;
              }
      
              .nombre {
                  font-size: 36px;
                  margin-bottom: 30px;
                  font-weight: bold;
                  font-family: "Great Vibes";
              }
      
              .seccional {
                  margin-top: -2%;
                  font-size: 40px;
                  font-weight: normal;
              }
      
              .sub-uni {
                  font-size: 30px;
                  margin-bottom: 30px;
                  font-weight: bold;
                  font-family: "Great Vibes";
                  margin-top: -1%;
              }
      
              .descripcion {
                  font-size: 24px;
                  margin-bottom: 10px;
                  text-align: justify;
              }
      
              .realizado {
                  margin-top: 30px;
                  font-size: 24px;
                  text-align: left;
              }
      
              .firmas {
                  margin-top: 100px;
                  text-align: center;
              }
      
              .firma {
                  display: inline-block;
                  width: 400px;
                  text-align: left;
                  border-top: 1px solid black;
                  margin-top: 20px;
              }
      
              .bold{
                  font-weight: bold;
              }
              
          </style>
      </head>
      
      <body>
          <div class="certificate">
              <h1 class="titulo-uni">La Universidad Pontificia Bolivariana – UPB </h1>
              <h1 class="seccional">Seccional Bucaramanga.</h1>
              <h3> Certifica que:</h1>
                  <div class="nombre">${name} ${lastname}</div>
                  <div class="sub-uni">Universidad Pontificia Bolivariana</div>
                  <div class="descripcion">Asistió y participó activamente en el evento <span class="bold">${namEvent}</span>, realizado en la Facultad de Ingeniería de Sistemas e Informática de la Seccional Bucaramanga.
                  </div>
                  <div class="realizado">Bucaramanga, ${formattedDate}
                  </div>
      
                  <div class="firmas">
                      <div class="firma">
                          ${nameOrganizer} <br> Docente líder del evento
                          <br> Facultad de Ingeniería de Sistemas e Informática 
      
                      </div>
      
      
      
                  </div>
          </div>
      </body>
      
      </html>
      `;

      // Genera el PDF a partir del contenido HTML
      const pdfBuffer = await this.generatePdf(htmlContent);

      // Establece las cabeceras del PDF en la respuesta
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'attachment; filename=certificado-asistencia.pdf');

      // Envía el PDF como respuesta
      res.send(pdfBuffer);

    } catch (error) {

    }


  }

  private async generatePdf(htmlContent: string): Promise<Buffer> {
    return new Promise<Buffer>((resolve, reject) => {
      const customWidth = '430mm'; // Ejemplo: '210mm' o '8.3in' o '595px'
        const customHeight = '243.5mm'; // Ejemplo: '297mm' o '11.7in' o '842px'
        const customOrientation = "landscape"
      const config  = {
        width: customWidth,
        height: customHeight,
        orientation: "landscape" as "landscape",
        border: '0'
      };

      pdf.create(htmlContent, config ).toBuffer((err, buffer) => {
        if (err) {
          reject(err);
        } else {
          resolve(buffer);
        }
      });
    });
  }




  async winnerCertificate(res: Response, idEvent: number, idUser: number) {
    //const doc = new PDFDocument();

    try {
      const user = await this.userRepository.findOne({
        where: {
          id: idUser
        }
      })

      const event = await this.eventRepository.findOne({
        where: {
          id: idEvent
        }
      })

      const name = user.name;
      const lastname = user.lastname;

      const namEvent = event.name;
      const date = event.startAt
      const nameOrganizer = event.organizerName;

      const currentDate = date;

      // Obtener el nombre del mes
      const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
        "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
      const monthName = monthNames[currentDate.getMonth()];

      // Obtener el día y el año
      const day = currentDate.getDate();
      const year = currentDate.getFullYear();

      // Construir la cadena de fecha en el formato deseado
      const formattedDate = `${monthName} ${day} de ${year}`;


      // Genera el contenido HTML y CSS
      const htmlContent = `<!DOCTYPE html>
      <html>
      
      <head>
          <link rel="preconnect" href="https://fonts.googleapis.com">
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
          <link href="https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap" rel="stylesheet">
          <style>
              
      
              body {
                  margin: 0;
                  background-image: url("https://i.ibb.co/dkThk17/Certificado-copia-page-0001.jpg");
                  background-repeat: no-repeat;
                  background-size: cover;
                  font-family: Arial, sans-serif;
                  color: black;
                  width: 430mm;
                  height: 222.646mm;
              }
      
              .certificate {
                  padding: 100px;
                  margin-top: 80px;
                  text-align: center;
              }
      
      
      
              .titulo-uni {
                  font-size: 40px;
              }
      
              .nombre {
                  font-size: 36px;
                  margin-bottom: 30px;
                  font-weight: bold;
                  font-family: "Great Vibes";
              }
      
              .seccional {
                  margin-top: -2%;
                  font-size: 40px;
                  font-weight: normal;
              }
      
              .sub-uni {
                  font-size: 30px;
                  margin-bottom: 30px;
                  font-weight: bold;
                  font-family: "Great Vibes";
                  margin-top: -1%;
              }
      
              .descripcion {
                  font-size: 24px;
                  margin-bottom: 10px;
                  text-align: justify;
              }
      
              .realizado {
                  margin-top: 30px;
                  font-size: 24px;
                  text-align: left;
              }
      
              .firmas {
                  margin-top: 100px;
                  text-align: center;
              }
      
              .firma {
                  display: inline-block;
                  width: 400px;
                  text-align: left;
                  border-top: 1px solid black;
                  margin-top: 20px;
              }
      
              .bold{
                  font-weight: bold;
              }
              
          </style>
      </head>
      
      <body>
          <div class="certificate">
              <h1 class="titulo-uni">La Universidad Pontificia Bolivariana – UPB </h1>
              <h1 class="seccional">Seccional Bucaramanga.</h1>
              <h3> Certifica que:</h1>
                  <div class="nombre">${name} ${lastname}</div>
                  <div class="sub-uni">Universidad Pontificia Bolivariana</div>
                  <div class="descripcion">Asistió, participó activamente y fue miembro del equipo que finalizó como ganador en el evento <span class="bold">${namEvent}</span>, realizado en la Facultad de Ingeniería de Sistemas e Informática de la Seccional Bucaramanga.
                  </div>
                  <div class="realizado">Bucaramanga, ${formattedDate}
                  </div>
      
                  <div class="firmas">
                      <div class="firma">
                          ${nameOrganizer} <br> Docente líder del evento
                          <br> Facultad de Ingeniería de Sistemas e Informática 
      
                      </div>
      
      
      
                  </div>
          </div>
      </body>
      
      </html>
      `;

      // Genera el PDF a partir del contenido HTML
      const pdfBuffer = await this.generatePdf(htmlContent);

      // Establece las cabeceras del PDF en la respuesta
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'attachment; filename=certificado-asistencia.pdf');

      // Envía el PDF como respuesta
      res.send(pdfBuffer);

    } catch (error) {

    }


  }



}
