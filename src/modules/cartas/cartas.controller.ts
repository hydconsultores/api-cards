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
import { CartasService } from './cartas.service';
import { CartasDto } from './cartas.dto';

@Controller('cartas')
export class CartasController {
  constructor(private readonly cartasService: CartasService) {}

  @Get('/cron')
  async getCron(): Promise<string[]> {
    return this.cartasService.startCron();
  }

  @Get('/busqueda/:nombre')
  async getBusquedaNombre(
    @Param('nombre') nombre :string
  ): Promise<any[]> {
    console.log("entrando")
    return this.cartasService.getBusquedaNombre(nombre);
  }

  @Get('/busquedaAll')
  async getBusquedaAll(
  ): Promise<any[]> {
    console.log("entrando")
    return this.cartasService.getBusquedaAll();
  }

  @Get('/busquedaId/:id')
  async getBusquedaId(
    @Param('id') id :any
  ): Promise<CartasDto> {
    console.log("entrando")
    return this.cartasService.getBusquedaId(id);
  }
  
  @Get('/busquedaGaleria/:idEdicion/:desde/:hasta/:isOrder/:current')
  async busquedaGaleria(
    @Param('idEdicion') idEdicion :any,
    @Param('desde') desde :any,
    @Param('hasta') hasta :any,
    @Param('isOrder') isOrder :string,
    @Param('current') current :number
  ): Promise<CartasDto[]> {
    console.log("entrando busquedaGaleria")
    return this.cartasService.busquedaGaleria(idEdicion,desde,hasta,isOrder,current);
  }

  @Post('/busquedaAvanzadaGaleria/:desde/:hasta/:isOrder/:current')
  async busquedaAvanzadaGaleria(
    @Body() app: {
      terminaciones: Array<number>;
      condiciones: Array<number>;
      ediciones: Array<number>;
      colores: Array<number>;
      legalities: Array<number>;
      lenguajes: Array<number>;
      rarezas: Array<number>;
      super_tipos: Array<number>;
      tipos: Array<number>;
      sub_tipos: Array<number>;
    },
    @Param('desde') desde :any,
    @Param('hasta') hasta :any,
    @Param('isOrder') isOrder :string,
    @Param('current') current :number    
  ): Promise<CartasDto[]> {
    console.log("entrando busquedaAvanzadaGaleria",app)
    return this.cartasService.busquedaAvanzadaGaleria(desde,hasta,isOrder,current,app);
  }
  
 
  @Get('/busquedaGaleria/edicion/:idEdicion')
  async busquedaGaleriaEdicion(
    @Param('idEdicion') idEdicion :any,
    @Param('desde') desde :any,
    @Param('hasta') hasta :any
  ): Promise<CartasDto[]> {
    console.log("entrando busquedaGaleriaEdicion")
    return this.cartasService.busquedaGaleriaEdicion(idEdicion,desde,hasta);
  }
}
