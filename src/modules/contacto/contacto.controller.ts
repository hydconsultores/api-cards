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
import { ContactoService } from './contacto.service';
import { ContactoDto } from './contacto.dto';
import { Contacto } from './contacto.entity';

@Controller('contacto')
export class ContactoController {
  constructor(private readonly contactoService: ContactoService) {}

  @Post('/crear')
  async crearContacto(@Body() app: ContactoDto): Promise<Contacto> {
    console.log(app);
    return await this.contactoService.create(app);
  }


}
