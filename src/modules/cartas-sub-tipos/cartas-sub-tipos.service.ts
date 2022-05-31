import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CartasSubTipos } from './cartas-sub-tipos.entity';
import { Repository, Not, getConnection } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import Config from '../../config/app';
import Axios from 'axios';
import { CartasSubTiposDto } from './cartas-sub-tipos.dto';

@Injectable()
export class CartasSubTiposService {
  constructor(
    @InjectRepository(CartasSubTipos)
    private readonly cartasSubTiposRepository: Repository<CartasSubTipos>
  ) { }

  async create(cartas:CartasSubTiposDto): Promise<CartasSubTiposDto> {
    return await this.cartasSubTiposRepository.save(cartas);
  }
}
