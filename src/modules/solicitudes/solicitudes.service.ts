import { Injectable, HttpException, HttpStatus, Inject, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Solicitudes } from './solicitudes.entity';
import { Repository, Not, getConnection } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import Config from '../../config/app';
import Axios from 'axios';
import { SolicitudesDto } from './solicitudes.dto';
import { CartasIndexService } from '../cartas-index/cartas-index.service';
import { ReservasService } from '../reservas/reservas.service';
import { MailService } from '../mail/mail.service';

@Injectable()
export class SolicitudesService {
  constructor(
    @InjectRepository(Solicitudes)
    private readonly solicitudesRepository: Repository<Solicitudes>,
    @Inject(forwardRef(() => ReservasService))
    private readonly reservasService: ReservasService,
    private readonly mailService: MailService
    
  ) { }

  async create(solicitud: SolicitudesDto): Promise<any> {
    //console.log(newRol);
    if (solicitud === undefined) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Debe incluir body',
        },
        400,
      );
    }

      try {
        let existe = await this.solicitudesRepository.find({token:solicitud.token})
        if(existe == undefined || existe.length == 0){
          return await this.solicitudesRepository.save(solicitud)
        }
        return existe

      } catch (ex) {
        throw new HttpException(
          {
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            error: ex.message,
          },
          500,
        );
      }
    }

  async updateSolicitud(solicitud: SolicitudesDto): Promise<any> {
      console.log("solicitud",solicitud);
      if (solicitud === undefined) {
        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            error: 'Debe incluir body',
          },
          400,
        );
      }
  
        try {
          let existe = await this.solicitudesRepository.findOne({token:solicitud.token})
          if(existe != null ){
            solicitud.id = existe.id;
            solicitud.status =  'EJECUTADO'
            await this.reservasService.changeStatusReserva(solicitud.id);
            let update = await this.solicitudesRepository.save(solicitud)
            //email cliente
            this.mailService.sendUserConfirmation(
              "Solicitud ingresada con éxito",
              "confirmation",
              solicitud.nombre+" "+solicitud.apellido_pat,
              solicitud.correo,
              solicitud.token,
              solicitud);
            
            //email soporte
            this.mailService.sendUserConfirmation(
              "ATENCIÓN, Solicitud Ingresada!",
              "soporte",
              "Equipo",
              "figs021@gmail.com",
              solicitud.token,
              solicitud);  
            return update;
          }else{
            throw new HttpException(
              {
                status: HttpStatus.BAD_REQUEST,
                error: 'No hemos encontrado la solicitud',
              },
              400,
            );
          }
          
     
          return existe;
  
        } catch (ex) {
          throw new HttpException(
            {
              status: HttpStatus.INTERNAL_SERVER_ERROR,
              error: ex.message,
            },
            500,
          );
        }
    }

    async findByToken(solicitud: string): Promise<SolicitudesDto> {
      //console.log(newRol);
      if (solicitud === undefined) {
        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            error: 'Debe incluir body',
          },
          400,
        );
      }
  
        try {
          return await this.solicitudesRepository.findOne({token:solicitud})

  
        } catch (ex) {
          throw new HttpException(
            {
              status: HttpStatus.INTERNAL_SERVER_ERROR,
              error: ex.message,
            },
            500,
          );
        }
      }

}
