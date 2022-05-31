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
import { CartasLegalitiesService } from './cartas-legalities.service';
import { CartasLegalitiesDto } from './cartas-legalities.dto';

@Controller('cartas-legalities')
export class CartasLegalitiesController {
  constructor(private readonly cartasLegalitiesService: CartasLegalitiesService) {}


}
