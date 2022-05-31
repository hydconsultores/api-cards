import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Terminaciones } from './terminaciones.entity';
import { Repository, Not, getConnection } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import Config from '../../config/app';
import Axios from 'axios';
import { TerminacionesDto } from './terminaciones.dto';

@Injectable()
export class TerminacionesService {
  constructor(
    @InjectRepository(Terminaciones)
    private readonly terminacionesRepository: Repository<Terminaciones>
  ) { }

  
  async findAll(): Promise<TerminacionesDto[]> {
    return await this.terminacionesRepository.find({status: 'ACTIVE'});
  }

  async findById(id:number): Promise<TerminacionesDto> {
    return await this.terminacionesRepository.findOne({id:id});
  }
}
