import {
  Controller,
  Get,
  UseGuards,
  Param,
  Post,
  Body,
  Request,
  Put,
} from '@nestjs/common';
import { LenguajesService } from './lenguajes.service';
import { LenguajesDto } from './lenguajes.dto';

@Controller('lenguajes')
export class LenguajesController {
  constructor(private readonly lenguajesService: LenguajesService) {}

  @Get('/busquedaAll')
  async getBusquedaAll(
  ): Promise<any[]> {
    console.log("entrando")
    return this.lenguajesService.findAll();
  }

}
