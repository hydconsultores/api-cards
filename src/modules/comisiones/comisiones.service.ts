import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comisiones } from './comisiones.entity';
import { Repository, Not, getConnection } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import Config from '../../config/app';
import Axios from 'axios';
import { ComisionesDto } from './comisiones.dto';

@Injectable()
export class ComisionesService {
  constructor(
    @InjectRepository(Comisiones)
    private readonly comisionesRepository: Repository<Comisiones>
  ) { }

  async findAll(): Promise<ComisionesDto[]> {
    return await this.comisionesRepository.find({status: 'ACTIVE'});
  }

  async create(rareza:ComisionesDto): Promise<ComisionesDto> {
    return await this.comisionesRepository.save(rareza);
  }
}
