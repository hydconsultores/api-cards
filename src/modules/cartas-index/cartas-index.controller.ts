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
import { CartasIndexService } from './cartas-index.service';
import { CartasIndexDto } from './cartas-index.dto';

@Controller('cartas-index')
export class CartasIndexController {
  constructor(private readonly cartasIndexService: CartasIndexService) {}


}
