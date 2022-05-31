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
import { TiposService } from './tipos.service';
import { TiposDto } from './tipos.dto';

@Controller('tipos')
export class TiposController {
  constructor(private readonly tiposService: TiposService) {}

  @Get('/cron')
  async getCron(): Promise<string[]> {
    return this.tiposService.startCron();
  }

  @Get('/busquedaAll')
  async getBusquedaAll(
  ): Promise<any[]> {
    console.log("entrando")
    return this.tiposService.findAll();
  }
}
