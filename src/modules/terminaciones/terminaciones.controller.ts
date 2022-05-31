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
import { TerminacionesService } from './terminaciones.service';
import { TerminacionesDto } from './terminaciones.dto';

@Controller('terminaciones')
export class TerminacionesController {
  constructor(private readonly terminacionesService: TerminacionesService) {}


  @Get('/active')
  async findAll(
  ): Promise<any[]> {
    console.log("entrando")
    return this.terminacionesService.findAll();
  }

}
