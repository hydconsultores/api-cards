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
import { SuperTiposService } from './super-tipos.service';
import { SuperTiposDto } from './super-tipos.dto';

@Controller('super-tipos')
export class SuperTiposController {
  constructor(private readonly superTiposService: SuperTiposService) {}

  @Get('/cron')
  async getCron(): Promise<string[]> {
    return this.superTiposService.startCron();
  }

  @Get('/busquedaAll')
  async getBusquedaAll(
  ): Promise<any[]> {
    console.log("entrando")
    return this.superTiposService.findAll();
  }
}
