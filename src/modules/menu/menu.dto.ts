import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { EdicionesDto } from '../ediciones/ediciones.dto';

export class MenuDto {
  @ApiPropertyOptional()
  @ApiProperty()
  id?: number;

  @ApiProperty()
  nombre: string;

  @ApiProperty()
  id_edicion: EdicionesDto;

  @ApiProperty()
  pisicion: number;

  @ApiProperty()
  status: string | 'ACTIVE' | 'DESACTIVE'  | 'DELETED';

  created_at?: Date;
  updated_at?: Date | null;
}
