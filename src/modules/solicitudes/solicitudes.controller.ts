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
import { SolicitudesService } from './solicitudes.service';
import { SolicitudesDto } from './solicitudes.dto';
import { Solicitudes } from './solicitudes.entity';

@Controller('solicitudes')
export class SolicitudesController {
  constructor(private readonly solicitudesService: SolicitudesService) {}
  
  @Post('/crear')
  async crearSolicitud(@Body() app: SolicitudesDto): Promise<Solicitudes> {
    console.log(app);
    return await this.solicitudesService.create(app);
  }

  @Put('/update')
  async updateSolicitud(@Body() app: SolicitudesDto): Promise<Solicitudes> {
    console.log(app);
    return await this.solicitudesService.updateSolicitud(app);
  }


  
}
