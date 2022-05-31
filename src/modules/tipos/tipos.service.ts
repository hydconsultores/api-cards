import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tipos } from './tipos.entity';
import { Repository, Not, getConnection } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import Config from '../../config/app';
import Axios from 'axios';
import { TiposDto } from './tipos.dto';

@Injectable()
export class TiposService {
  constructor(
    @InjectRepository(Tipos)
    private readonly tiposRepository: Repository<Tipos>
  ) { }

  async startCron(): Promise<any> {
    try {
      let header = {
        headers: {
        },
        timeout: 30000,
      };

      const result = await Axios.get(
        process.env.API_CARD + '/types',
        header,
      );
      if (result != undefined && result !== null
        && result.data!==undefined) {
          console.log(result.data)
          for (const types of result.data.types) {
              console.log("types",types)
             let supertipo = await this.tiposRepository.findOne({ nombre: types });
             console.log("supertipo",supertipo)
             if(supertipo === undefined){
               console.log("debi insertar");
              let tiposDto = new TiposDto();
              tiposDto.nombre = types;
              tiposDto.status = 'ACTIVE';
              tiposDto.created_at = new Date();
              console.log("tiposDto",tiposDto);
              await this.tiposRepository.save(tiposDto);
             }
          }
        
        return result.data;
      } 
    } catch (ex) {
      throw new HttpException(
        {
          status: 500,
          error: ex
        },
        500,
      );
    }
  }

  async findAll(): Promise<TiposDto[]> {
    return await this.tiposRepository.find({status: 'ACTIVE'});
  }
}
