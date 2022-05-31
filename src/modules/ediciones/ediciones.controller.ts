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
import { EdicionesService } from './ediciones.service';
import { EdicionesDto } from './ediciones.dto';

@Controller('ediciones')
export class EdicionesController {
  constructor(private readonly edicionesService: EdicionesService) {}

  @Get('/busquedaAll')
  async getBusquedaAll(
  ): Promise<any[]> {
    console.log("entrando")
    return this.edicionesService.getBusquedaAll();
  }
}
