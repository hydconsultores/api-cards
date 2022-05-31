import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class LenguajesDto {
  @ApiPropertyOptional()
  @ApiProperty()
  id?: number;

  @ApiProperty()
  nombre: string;

  @ApiProperty()
  status: string | 'ACTIVE' | 'DESACTIVE'  | 'DELETED';

  created_at?: Date;
  updated_at?: Date | null;
}
