import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Reservas } from './reservas.entity';
import { Repository, Not, getConnection } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import Config from '../../config/app';
import Axios from 'axios';
import { ReservasDto } from './reservas.dto';
import { CartasIndexService } from '../cartas-index/cartas-index.service';
import { SolicitudesService } from '../solicitudes/solicitudes.service';
import { SolicitudesDto } from '../solicitudes/solicitudes.dto';

@Injectable()
export class ReservasService {
  constructor(
    @InjectRepository(Reservas)
    private readonly reservasRepository: Repository<Reservas>,
    private readonly cartasIndexService: CartasIndexService,
    private readonly solicitudesService: SolicitudesService
  ) { }

  
  async finByToken(data: any): Promise<any[]> {
    console.log(data.token)
    let existe = await this.solicitudesService.findByToken(data.token)
    if(existe != null ){
      console.log(existe.id)
       //await this.reservasRepository.find({id_solicitud:existe})

      return await this.reservasRepository
      .createQueryBuilder('reservas')
      .select('reservas')
      .innerJoinAndSelect('reservas.id_carta', 'id_carta')
      .innerJoinAndSelect('reservas.id_carta_index', 'id_carta_index')
      .innerJoinAndSelect('id_carta_index.id_edicion', 'id_edicion')
      .innerJoinAndSelect('id_carta_index.id_condicion', 'id_condicion')
      .innerJoinAndSelect('id_carta_index.id_terminacion', 'id_terminacion')
      .innerJoinAndSelect('id_carta_index.id_lenguaje', 'id_lenguaje')
      .where('reservas.id_solicitud=:id_solicitud AND reservas.status=:status', { id_solicitud:existe.id, status: 'PENDIENTE' })
      .getMany();

    }

  }
  async create(reserva: ReservasDto): Promise<any> {
    //console.log(newRol);
    if (reserva === undefined) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Debe incluir body',
        },
        400,
      );
    }
    reserva.status = 'PENDIENTE';
    console.log("reserva", reserva)
    
    let existe = await this.solicitudesService.findByToken(reserva.id_solicitud.token)
    console.log("existe",existe)
    if(existe != undefined ){
      console.log(existe.id)
      reserva.id_solicitud.id = existe.id
    }else{
      //crear
      let solicitudNew = new SolicitudesDto();
      solicitudNew.token = reserva.id_solicitud.token
      await this.solicitudesService.create(solicitudNew)
      existe = await this.solicitudesService.findByToken(reserva.id_solicitud.token)

    }
    let cartaIndex = await this.cartasIndexService.getBusquedaCartaIdIndex(reserva.id_carta_index)
    if (cartaIndex !== null) {
      if (cartaIndex.stock < reserva.cantidad) {
        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            error: 'La cantidad ingresada es mayor al stock disponible',
          },
          400,
        );
      }

      try {
        cartaIndex.stock = cartaIndex.stock - reserva.cantidad;

        let reservaEjecutada = await this.reservasRepository.save(reserva);
        if (reservaEjecutada != null) {
          //actualizo stock
          cartaIndex = await this.cartasIndexService.edit(cartaIndex)

          let cartasIndex = await this.cartasIndexService.getBusquedaIdIndex(reserva.id_carta);
          return {
            cartaIndex: cartaIndex,
            cartasIndex: cartasIndex
          };

        }
        return reservaEjecutada;
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

  
  async updateContador(reserva: ReservasDto): Promise<any> {
    //console.log(newRol);
    if (reserva === undefined) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Debe incluir body',
        },
        400,
      );
    }
    let reservaActual = await this.reservasRepository.findOne({id:reserva.id});
    let cartaIndex = await this.cartasIndexService.getBusquedaCartaIdIndex(reserva.id_carta_index.id)
    if (cartaIndex !== null) {
      if (cartaIndex.stock < (reserva.cantidad - reservaActual.cantidad)) {
        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            error: 'La cantidad ingresada es mayor al stock disponible',
            reservas: reservaActual
          },
          400,
        );
      }

      try {
        cartaIndex.stock = cartaIndex.stock - (reserva.cantidad - reservaActual.cantidad);
        reservaActual.cantidad = reserva.cantidad;
        
        let reservaActualizada = await this.reservasRepository.save(reservaActual);
        if (reservaActualizada != null) {
          cartaIndex = await this.cartasIndexService.edit(cartaIndex)
        }
        return reservaActualizada;
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

  
  async desactive(reservas: any): Promise<any> {
    if (reservas === undefined) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Debe incluir body',
        },
        400,
      );
    }

    let id_reserva = reservas.id_reserva;

    let reservaup = await this.reservasRepository.createQueryBuilder('reservas')
    .innerJoinAndSelect('reservas.id_carta_index', 'id_carta_index')
    .where('reservas.id = :id_reserva', 
    { id_reserva: id_reserva})
    .getOne();
    console.log("reservaup",reservaup)
    if (reservaup !== null) {
      console.log("reservaup",reservaup)
      reservaup.status = 'DELETED';
      await this.reservasRepository.save(reservaup)
      let cartaIndex = await this.cartasIndexService.getBusquedaCartaIdIndex(reservaup.id_carta_index.id)
      cartaIndex.stock = reservaup.cantidad;
      await this.cartasIndexService.edit(cartaIndex)
      return reservaup;
    }else{
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Error',
        },
        400,
      );
    }    
  }
  
}
