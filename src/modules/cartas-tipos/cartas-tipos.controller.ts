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
import { CartasTiposService } from './cartas-tipos.service';
import { CartasTiposDto } from './cartas-tipos.dto';

@Controller('cartas-tipos')
export class CartasTiposController {
  constructor(private readonly cartasTiposService: CartasTiposService) {}


}
