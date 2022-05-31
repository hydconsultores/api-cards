import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CartasLegalities } from './cartas-legalities.entity';
import { Repository, Not, getConnection } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import Config from '../../config/app';
import Axios from 'axios';
import { CartasLegalitiesDto } from './cartas-legalities.dto';

@Injectable()
export class CartasLegalitiesService {
  constructor(
    @InjectRepository(CartasLegalities)
    private readonly cartasLegalitiesRepository: Repository<CartasLegalities>
  ) { }

  async create(cartas:CartasLegalitiesDto): Promise<CartasLegalitiesDto> {
    return await this.cartasLegalitiesRepository.save(cartas);
  }
}
