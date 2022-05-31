import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Lenguajes } from './lenguajes.entity';
import { Repository, Not, getConnection } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import Config from '../../config/app';
import Axios from 'axios';
import { LenguajesDto } from './lenguajes.dto';

@Injectable()
export class LenguajesService {
  constructor(
    @InjectRepository(Lenguajes)
    private readonly lenguajesRepository: Repository<Lenguajes>
  ) { }
  
  async findAll(): Promise<LenguajesDto[]> {
    return await this.lenguajesRepository.find({status: 'ACTIVE'});
  }

  async create(lenguaje:LenguajesDto): Promise<LenguajesDto> {
    return await this.lenguajesRepository.save(lenguaje);
  }
}
