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

  async certificate(idEvent: number, idUser: number) {
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

      const date = event.startAt
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

      return {
        ok: true,
        name: user.name,
        lastname: user.lastname,
        event: event.name,
        organizer: event.organizerName,
        date: formattedDate
      };
 


  

    } catch (error) {
        console.error('Error generando el certificado:', error);
       
    }


  }

  



}
