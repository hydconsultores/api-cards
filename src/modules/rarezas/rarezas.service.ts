import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Rarezas } from './rarezas.entity';
import { Repository, Not, getConnection } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import Config from '../../config/app';
import Axios from 'axios';
import { RarezasDto } from './rarezas.dto';

@Injectable()
export class RarezasService {
  constructor(
    @InjectRepository(Rarezas)
    private readonly rarezasRepository: Repository<Rarezas>
  ) { }

  async findAll(): Promise<RarezasDto[]> {
    return await this.rarezasRepository.find({status: 'ACTIVE'});
  }

  async create(rareza:RarezasDto): Promise<RarezasDto> {
    return await this.rarezasRepository.save(rareza);
  }
}
