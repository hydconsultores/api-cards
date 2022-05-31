import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CartasIndex } from './cartas-index.entity';
import { CartasIndexDto } from './cartas-index.dto';

import { Repository, Not, getConnection } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import Config from '../../config/app';
import Axios from 'axios';

@Injectable()
export class CartasIndexService {
  constructor(
    @InjectRepository(CartasIndex)
    private readonly cartasIndexRepository: Repository<CartasIndex>
  ) { }

  async create(cartas:CartasIndexDto): Promise<CartasIndexDto> {
    return await this.cartasIndexRepository.save(cartas);
  }


  async getBusquedaIdIndex(id: any): Promise<any> {
    try {
      console.log("nombre", id)
      let cartas = await this.cartasIndexRepository
        .createQueryBuilder('cartasIndex')
        .select('cartasIndex')
        .leftJoinAndSelect('cartasIndex.id_condicion', 'condicion')
        .leftJoinAndSelect('cartasIndex.id_edicion', 'id_edicion')
        .leftJoinAndSelect('cartasIndex.id_lenguaje', 'id_lenguaje')
        .leftJoinAndSelect('cartasIndex.id_rareza', 'id_rareza')
        .leftJoinAndSelect('cartasIndex.id_terminacion', 'id_terminacion')
        .leftJoinAndSelect('cartasIndex.id_color', 'id_color')
        .where('cartasIndex.id_carta = :id AND cartasIndex.status=:status', { id: id, status: 'ACTIVE' })
        .orderBy('cartasIndex.stock', 'DESC')
        .getMany();
      //console.log("cartas", cartas)
      return cartas;
    } catch (ex) {
      console.log(ex);
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: ex.message,
        },
        500,
      );
    }
  }


  async getBusquedaCartaIdIndex(id: any): Promise<any> {
    try {
      console.log("nombre", id)
      let cartas = await this.cartasIndexRepository
        .createQueryBuilder('cartasIndex')
        .select('cartasIndex')
        .leftJoinAndSelect('cartasIndex.id_condicion', 'condicion')
        .leftJoinAndSelect('cartasIndex.id_edicion', 'id_edicion')
        .leftJoinAndSelect('cartasIndex.id_lenguaje', 'id_lenguaje')
        .leftJoinAndSelect('cartasIndex.id_rareza', 'id_rareza')
        .leftJoinAndSelect('cartasIndex.id_terminacion', 'id_terminacion')
        .leftJoinAndSelect('cartasIndex.id_color', 'id_color')
        .where('cartasIndex.id = :id AND cartasIndex.status=:status', { id: id, status: 'ACTIVE' })
        .orderBy('cartasIndex.id', 'ASC')
        .getOne();
      
        console.log("cartas", cartas)
      return cartas;
    } catch (ex) {
      console.log(ex);
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: ex.message,
        },
        500,
      );
    }
  }

  async edit(cartas:CartasIndexDto): Promise<CartasIndexDto> {
    return await this.cartasIndexRepository.save(cartas);
  }
}
