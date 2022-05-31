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
import { SubTiposService } from './sub-tipos.service';
import { SubTiposDto } from './sub-tipos.dto';

@Controller('sub-tipos')
export class SubTiposController {
  constructor(private readonly subTiposService: SubTiposService) {}

  @Get('/cron')
  async getCron(): Promise<string[]> {
    return this.subTiposService.startCron();
  }

  @Get('/busquedaAll')
  async getBusquedaAll(
  ): Promise<any[]> {
    console.log("entrando")
    return this.subTiposService.findAll();
  }
}
