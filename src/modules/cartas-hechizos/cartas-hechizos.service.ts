import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CartasHechizos } from './cartas-hechizos.entity';
import { Repository, Not, getConnection } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import Config from '../../config/app';
import Axios from 'axios';
import { CartasHechizosDto } from './cartas-hechizos.dto';

@Injectable()
export class CartasHechizosService {
  constructor(
    @InjectRepository(CartasHechizos)
    private readonly cartasHechizosRepository: Repository<CartasHechizos>
  ) { }

  async create(cartas:CartasHechizosDto): Promise<CartasHechizosDto> {
    return await this.cartasHechizosRepository.save(cartas);
  }
}
