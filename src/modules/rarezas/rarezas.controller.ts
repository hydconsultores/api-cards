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
import { RarezasService } from './rarezas.service';
import { RarezasDto } from './rarezas.dto';

@Controller('rarezas')
export class RarezasController {
  constructor(private readonly rarezasService: RarezasService) {}

  @Get('/busquedaAll')
  async getBusquedaAll(
  ): Promise<any[]> {
    console.log("entrando")
    return this.rarezasService.findAll();
  }
}
