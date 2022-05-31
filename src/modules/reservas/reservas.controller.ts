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
import { ReservasService } from './reservas.service';
import { ReservasDto } from './reservas.dto';
import { Reservas } from './reservas.entity';

@Controller('reservas')
export class ReservasController {
  constructor(private readonly reservasService: ReservasService) {}

  @Post('/crear')
  async crearReserva(@Body() app: ReservasDto): Promise<Reservas> {
    console.log(app);
    return await this.reservasService.create(app);
  }

  @Post('/fin-by-token')
  async finByToken(@Body() app: any): Promise<any> {
    console.log(app)
    return await this.reservasService.finByToken(app);

  }

  @Put('/update-contador')
  async updateContador(@Body() app: any): Promise<any> {
    console.log(app)
    return await this.reservasService.updateContador(app);
  }

  @Put('/desactive')
  async desactive(@Body() app: any): Promise<any> {
    console.log(app)
    return await this.reservasService.desactive(app);

  }
}
