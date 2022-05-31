import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CartasTipos } from './cartas-tipos.entity';
import { Repository, Not, getConnection } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import Config from '../../config/app';
import Axios from 'axios';
import { CartasTiposDto } from './cartas-tipos.dto';

@Injectable()
export class CartasTiposService {
  constructor(
    @InjectRepository(CartasTipos)
    private readonly cartasTiposRepository: Repository<CartasTipos>
  ) { }

  async create(cartas:CartasTiposDto): Promise<CartasTiposDto> {
    return await this.cartasTiposRepository.save(cartas);
  }
}
