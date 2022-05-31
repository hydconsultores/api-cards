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
import { ColoresService } from './colores.service';
import { ColoresDto } from './colores.dto';

@Controller('colores')
export class ColoresController {
  constructor(private readonly coloresService: ColoresService) {}
  @Get('/busquedaAll')
  async getBusquedaAll(
  ): Promise<any[]> {
    console.log("entrando")
    return this.coloresService.findAll();
  }
}
