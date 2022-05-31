import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Legalities } from './legalities.entity';
import { Repository, Not, getConnection } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import Config from '../../config/app';
import Axios from 'axios';
import { LegalitiesDto } from './legalities.dto';

@Injectable()
export class LegalitiesService {
  constructor(
    @InjectRepository(Legalities)
    private readonly legalitiesRepository: Repository<Legalities>
  ) { }

  async startCron(): Promise<any> {
    try {
      let header = {
        headers: {
        },
        timeout: 30000,
      };

      const result = await Axios.get(
        process.env.API_CARD + '/formats',
        header,
      );
      if (result != undefined && result !== null
        && result.data!==undefined) {
          console.log(result.data)
          for (const formats of result.data.formats) {
              console.log("formats",formats)
             let formatsSw = await this.legalitiesRepository.findOne({ nombre: formats });
             console.log("formats",formatsSw)
             if(formatsSw === undefined){
               console.log("debi insertar");
              let legalitiesDto = new LegalitiesDto();
              legalitiesDto.nombre = formats;
              legalitiesDto.status = 'ACTIVE';
              legalitiesDto.created_at = new Date();
              console.log("legalitiesDto",legalitiesDto);
              await this.legalitiesRepository.save(legalitiesDto);
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

  async findAll(): Promise<LegalitiesDto[]> {
    return await this.legalitiesRepository.find({status: 'ACTIVE'});
  }

  async create(rareza:LegalitiesDto): Promise<LegalitiesDto> {
    return await this.legalitiesRepository.save(rareza);
  }
}
