import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { CartasIndexDto } from '../cartas-index/cartas-index.dto';
import { CartasDto } from '../cartas/cartas.dto';
import { SolicitudesDto } from '../solicitudes/solicitudes.dto';

export class ReservasDto {
  @ApiPropertyOptional()
  @ApiProperty()
  id?: number;

  @ApiProperty()
  id_carta_index:CartasIndexDto;

  @ApiProperty()
  id_carta:CartasDto;

  @ApiProperty()
  id_solicitud:SolicitudesDto;

  @ApiProperty()
  cantidad:number;
  
  @ApiProperty()
  precio_unitario:number;

  @ApiProperty()
  stock:number;

  @ApiProperty()
  status: string | 'EJECUTADO' | 'PENDIENTE' | 'DELETED';

  created_at?: Date;
  updated_at?: Date | null;
}
