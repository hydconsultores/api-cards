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
import { HechizosService } from './hechizos.service';
import { HechizosDto } from './hechizos.dto';

@Controller('hechizos')
export class HechizosController {
  constructor(private readonly hechizos: HechizosService) {}


}
