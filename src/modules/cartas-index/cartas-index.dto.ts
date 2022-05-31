import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { CartasDto } from '../cartas/cartas.dto';
import { ColoresDto } from '../colores/colores.dto';
import { CondicionesDto } from '../condiciones/condiciones.dto';
import { EdicionesDto } from '../ediciones/ediciones.dto';
import { HechizosDto } from '../hechizos/hechizos.dto';
import { LenguajesDto } from '../lenguajes/lenguajes.dto';
import { RarezasDto } from '../rarezas/rarezas.dto';
import { TerminacionesDto } from '../terminaciones/terminaciones.dto';
import { TiposDto } from '../tipos/tipos.dto';

export class CartasIndexDto {
  @ApiPropertyOptional()
  @ApiProperty()
  id?: number;

  @ApiProperty()
  id_carta: CartasDto;

  @ApiProperty()
  id_condicion: CondicionesDto;

  @ApiProperty()
  id_edicion: EdicionesDto;

  @ApiProperty()
  id_lenguaje: LenguajesDto;

  @ApiProperty()
  id_rareza: RarezasDto;

  /*@ApiProperty()
  id_hechizo: HechizosDto;*/

  @ApiProperty()
  id_terminacion: TerminacionesDto;

  @ApiProperty()
  id_color: ColoresDto;

  @ApiProperty()
  stock: number;

  @ApiProperty()
  precio: number;

  @ApiProperty()
  imagen: string;

  @ApiProperty()
  nombre: string;

  @ApiProperty()
  texto: string;

  @ApiProperty()
  flavor: string;
  
  @ApiProperty()
  tipo_concatenado: string;
  
  @ApiProperty()
  status: string | 'ACTIVE' | 'DESACTIVE'  | 'DELETED';

  created_at?: Date;
  updated_at?: Date | null;
}
