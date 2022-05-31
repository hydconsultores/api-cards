import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Colores } from './colores.entity';
import { Repository, Not, getConnection } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import Config from '../../config/app';
import Axios from 'axios';
import { ColoresDto } from './colores.dto';

@Injectable()
export class ColoresService {
  constructor(
    @InjectRepository(Colores)
    private readonly coloresRepository: Repository<Colores>
  ) { }

  async findAll(): Promise<ColoresDto[]> {
    return await this.coloresRepository.find({status: 'ACTIVE'});
  }

  async create(color:ColoresDto): Promise<ColoresDto> {
    return await this.coloresRepository.save(color);
  }
}
