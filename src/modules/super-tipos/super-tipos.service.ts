import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SuperTipos } from './super-tipos.entity';
import { SuperTiposDto } from './super-tipos.dto';
import { Repository, Not, getConnection } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import Config from '../../config/app';
import Axios from 'axios';

@Injectable()
export class SuperTiposService {
  constructor(
    @InjectRepository(SuperTipos)
    private readonly superTiposRepository: Repository<SuperTipos>
  ) { }


  async startCron(): Promise<any> {
    try {
      let header = {
        headers: {
        },
        timeout: 30000,
      };

      const result = await Axios.get(
        process.env.API_CARD + '/supertypes',
        header,
      );
      if (result != undefined && result !== null
        && result.data!==undefined) {
          console.log(result.data)
          for (const supertipos of result.data.supertypes) {
              console.log("supertipos",supertipos)
             let supertipo = await this.superTiposRepository.findOne({ nombre: supertipos });
             console.log("supertipo",supertipo)
             if(supertipo === undefined){
               console.log("debi insertar");
              let superTiposDto = new SuperTiposDto();
              superTiposDto.nombre = supertipos;
              superTiposDto.status = 'ACTIVE';
              superTiposDto.created_at = new Date();
              console.log("superTiposDto",superTiposDto);
              await this.superTiposRepository.save(superTiposDto);
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

  async findAll(): Promise<SuperTiposDto[]> {
    return await this.superTiposRepository.find({status: 'ACTIVE'});
  }
}
