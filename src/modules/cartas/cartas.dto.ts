import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { EdicionesDto } from '../ediciones/ediciones.dto';

export class CartasDto {
  @ApiPropertyOptional()
  @ApiProperty()
  id?: number;

  @ApiProperty()
  nombre: string;

  @ApiProperty()
  id_edicion: EdicionesDto;

  @ApiProperty()
  numero: string;

  @ApiProperty()
  status: string | 'ACTIVE' | 'DESACTIVE'  | 'DELETED';

  created_at?: Date;
  updated_at?: Date | null;
}
