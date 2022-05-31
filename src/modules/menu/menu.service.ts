import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Menu } from './menu.entity';
import { Repository, Not, getConnection, LimitOnUpdateNotSupportedError } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import Config from '../../config/app';
import Axios from 'axios';
import { MenuDto } from './menu.dto';

@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(Menu)
    private readonly menuRepository: Repository<Menu>,

  ) { }


  async getBusquedaActive(): Promise<Menu[]> {
    try {
      let menu = await this.menuRepository
      .createQueryBuilder('menu')
      .select('menu')
      .innerJoinAndSelect('menu.id_edicion_menu', 'edicion')
      .where('menu.status=:status', { status: 'ACTIVE' })
      .getMany();

      return menu;
    } catch (ex) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: ex.message,
        },
        500,
      );
    }
  }

}
