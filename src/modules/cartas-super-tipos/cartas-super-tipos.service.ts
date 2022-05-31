import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CartasSuperTipos } from './cartas-super-tipos.entity';
import { Repository, Not, getConnection } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import Config from '../../config/app';
import Axios from 'axios';
import { CartasSuperTiposDto } from './cartas-super-tipos.dto';

@Injectable()
export class CartasSuperTiposService {
  constructor(
    @InjectRepository(CartasSuperTipos)
    private readonly cartasSuperTiposRepository: Repository<CartasSuperTipos>
  ) { }

  async create(cartas:CartasSuperTiposDto): Promise<CartasSuperTiposDto> {
    return await this.cartasSuperTiposRepository.save(cartas);
  }
}
