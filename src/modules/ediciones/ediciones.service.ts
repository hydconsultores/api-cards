import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Ediciones } from './ediciones.entity';
import { Repository, Not, getConnection } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import Config from '../../config/app';
import Axios from 'axios';
import { EdicionesDto } from './ediciones.dto';

@Injectable()
export class EdicionesService {
  constructor(
    @InjectRepository(Ediciones)
    private readonly edicionesRepository: Repository<Ediciones>
  ) { }

  async findAll(): Promise<EdicionesDto[]> {
    return await this.edicionesRepository.find({status: 'ACTIVE'});
  }

  async create(edicion:EdicionesDto): Promise<EdicionesDto> {
    return await this.edicionesRepository.save(edicion);
  }

  async getBusquedaAll(): Promise<EdicionesDto[]> {
    try {
      let ediciones = await this.edicionesRepository
      .createQueryBuilder('ediciones')
      .select('ediciones')
      .where('ediciones.status=:status', { status: 'ACTIVE' })
      .getMany();

      return ediciones;
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
