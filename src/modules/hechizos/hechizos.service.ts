import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Hechizos } from './hechizos.entity';
import { Repository, Not, getConnection } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import Config from '../../config/app';
import Axios from 'axios';
import { HechizosDto } from './hechizos.dto';

@Injectable()
export class HechizosService {
  constructor(
    @InjectRepository(Hechizos)
    private readonly hechizosRepository: Repository<Hechizos>
  ) { }

  async findAll(): Promise<HechizosDto[]> {
    return await this.hechizosRepository.find({status: 'ACTIVE'});
  }

  async create(rareza:HechizosDto): Promise<HechizosDto> {
    return await this.hechizosRepository.save(rareza);
  }
}
