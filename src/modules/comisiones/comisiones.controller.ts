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
import { ComisionesService } from './comisiones.service';
import { ComisionesDto } from './comisiones.dto';

@Controller('comisiones')
export class ComisionesController {
  constructor(private readonly comisiones: ComisionesService) {}


}
