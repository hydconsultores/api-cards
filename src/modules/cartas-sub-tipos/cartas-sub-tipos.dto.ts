import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { CartasDto } from '../cartas/cartas.dto';
import { SubTiposDto } from '../sub-tipos/sub-tipos.dto';
import { SuperTiposDto } from '../super-tipos/super-tipos.dto';
import { TiposDto } from '../tipos/tipos.dto';

export class CartasSubTiposDto {
  @ApiPropertyOptional()
  @ApiProperty()
  id?: number;

  @ApiProperty()
  id_carta: CartasDto;

  @ApiProperty()
  id_sub_tipo: SubTiposDto;

  
  @ApiProperty()
  status: string | 'ACTIVE' | 'DESACTIVE'  | 'DELETED';

  created_at?: Date;
  updated_at?: Date | null;
}
