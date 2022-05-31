import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Condiciones } from './condiciones.entity';
import { Repository, Not, getConnection } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import Config from '../../config/app';
import Axios from 'axios';
import { CondicionesDto } from './condiciones.dto';

@Injectable()
export class CondicionesService {
  constructor(
    @InjectRepository(Condiciones)
    private readonly condicionesRepository: Repository<Condiciones>
  ) { }
  async findAll(): Promise<CondicionesDto[]> {
    return await this.condicionesRepository.find({status: 'ACTIVE'});
  }

  async findById(id:number): Promise<CondicionesDto> {
    return await this.condicionesRepository.findOne({id: id});
  }

  async findNameActive(): Promise<Condiciones[]> {
    try {
      console.log("condiciones")
      let condiciones = await this.condicionesRepository
      .createQueryBuilder('condiciones')
      .select('condiciones.nombre')
      .where('condiciones.status=:status', { status: 'ACTIVE' })
      .getMany();

      console.log("condiciones",condiciones)
      return condiciones;
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
