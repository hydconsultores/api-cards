import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SubTipos } from './sub-tipos.entity';
import { Repository, Not, getConnection } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import Config from '../../config/app';
import Axios from 'axios';
import { SubTiposDto } from './sub-tipos.dto';

@Injectable()
export class SubTiposService {
  constructor(
    @InjectRepository(SubTipos)
    private readonly subTiposRepository: Repository<SubTipos>
  ) { }

  async startCron(): Promise<any> {
    try {
      let header = {
        headers: {
        },
        timeout: 30000,
      };

      const result = await Axios.get(
        process.env.API_CARD + '/subtypes',
        header,
      );
      if (result != undefined && result !== null
        && result.data!==undefined) {
          console.log(result.data)
          for (const subtypes of result.data.subtypes) {
              console.log("subtypes",subtypes)
             let supertipo = await this.subTiposRepository.findOne({ nombre: subtypes });
             console.log("supertipo",supertipo)
             if(supertipo === undefined){
               console.log("debi insertar");
              let subTiposDto = new SubTiposDto();
              subTiposDto.nombre = subtypes;
              subTiposDto.status = 'ACTIVE';
              subTiposDto.created_at = new Date();
              console.log("subTiposDto",subTiposDto);
              await this.subTiposRepository.save(subTiposDto);
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

  async findAll(): Promise<SubTiposDto[]> {
    return await this.subTiposRepository.find({status: 'ACTIVE'});
  }

}
