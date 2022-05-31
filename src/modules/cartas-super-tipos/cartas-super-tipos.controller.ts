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
import { CartasSuperTiposService } from './cartas-super-tipos.service';
import { CartasSuperTiposDto } from './cartas-super-tipos.dto';

@Controller('cartas-super-tipos')
export class CartasSuperTiposController {
  constructor(private readonly cartasSuperTiposService: CartasSuperTiposService) {}


}
