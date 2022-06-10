import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ContactoDto {
  @ApiPropertyOptional()
  @ApiProperty()
  id?: number;

  @ApiProperty()
  nombre: string;

  @ApiProperty()
  asunto: string;

  @ApiProperty()
  correo: string;

  @ApiProperty()
  telefono: string;

  @ApiProperty()
  comentario: string;

  created_at?: Date;
  updated_at?: Date | null;
}
