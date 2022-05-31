import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class SolicitudesDto {
  @ApiPropertyOptional()
  @ApiProperty()
  id?: number;

  @ApiProperty()
  token:string;

  @ApiProperty()
  nombre:string;
  
  @ApiProperty()
  apellido_pat:string;

  @ApiProperty()
  apellido_mat:string;

  @ApiProperty()
  correo:string;

  @ApiProperty()
  telefono:string;

  @ApiProperty()
  direccion:string;

  @ApiProperty()
  status: string | 'EJECUTADO' | 'PENDIENTE' | 'DELETED';

  created_at?: Date;
  updated_at?: Date | null;
}
