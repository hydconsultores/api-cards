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
import { LegalitiesService } from './legalities.service';
import { LegalitiesDto } from './legalities.dto';

@Controller('legalities')
export class LegalitiesController {
  constructor(private readonly legalitiesService: LegalitiesService) {}

  @Get('/cron')
  async getCron(): Promise<string[]> {
    return this.legalitiesService.startCron();
  }

  @Get('/busquedaAll')
  async getBusquedaAll(
  ): Promise<any[]> {
    console.log("entrando")
    return this.legalitiesService.findAll();
  }
}
