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
import { CartasSubTiposService } from './cartas-sub-tipos.service';
import { CartasSubTiposDto } from './cartas-sub-tipos.dto';

@Controller('cartas-sub-tipos')
export class CartasSubTiposController {
  constructor(private readonly cartasSubTiposService: CartasSubTiposService) {}


}
