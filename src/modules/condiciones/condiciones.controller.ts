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
import { CondicionesService } from './condiciones.service';
import { CondicionesDto } from './condiciones.dto';

@Controller('condiciones')
export class CondicionesController {
  constructor(private readonly condicionesService: CondicionesService) {}

  @Get('/active')
  async findAll(
  ): Promise<any[]> {
    console.log("entrando")
    return this.condicionesService.findAll();
  }

  @Get('/name-active')
  async findNameActive(
  ): Promise<any[]> {
    console.log("entrando")
    return this.condicionesService.findNameActive();
  }

}
