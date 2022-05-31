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
import { CartasHechizosService } from './cartas-hechizos.service';
import { CartasHechizosDto } from './cartas-hechizos.dto';

@Controller('cartas-hechizos')
export class CartasHechizosController {
  constructor(private readonly cartasHechizosService: CartasHechizosService) {}


}
