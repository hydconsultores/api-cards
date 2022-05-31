import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { CartasDto } from '../cartas/cartas.dto';
import { HechizosDto } from '../hechizos/hechizos.dto';
import { LegalitiesDto } from '../legalities/legalities.dto';
import { SubTiposDto } from '../sub-tipos/sub-tipos.dto';
import { SuperTiposDto } from '../super-tipos/super-tipos.dto';
import { TiposDto } from '../tipos/tipos.dto';

export class CartasHechizosDto {
  @ApiPropertyOptional()
  @ApiProperty()
  id?: number;

  @ApiProperty()
  id_carta: CartasDto;

  @ApiProperty()
  id_hechizo: HechizosDto;
  
  @ApiProperty()
  valor: string;

  @ApiProperty()
  status: string | 'ACTIVE' | 'DESACTIVE'  | 'DELETED';

  created_at?: Date;
  updated_at?: Date | null;
}
