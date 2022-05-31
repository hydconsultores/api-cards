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
import { MenuService } from './menu.service';
import { MenuDto } from './menu.dto';
import { Menu } from './menu.entity';

@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Get('/busqueda/:status')
  async getBusquedaMenus(
  ): Promise<Menu[]> {
    console.log("entrando")
    return this.menuService.getBusquedaActive();
  }
  
}
