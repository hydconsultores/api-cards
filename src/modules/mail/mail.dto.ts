import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { ContactoDto } from "../contacto/contacto.dto";
import { SolicitudesDto } from "../solicitudes/solicitudes.dto";

export class MailDto {
    @ApiPropertyOptional()
    @ApiProperty()
    id?: number;

    @ApiProperty()
    accepted: string;

    @ApiProperty()
    precio: number;
  
    @ApiProperty()
    rejected: string;

    @ApiProperty()
    envelopeTime: number;
  
    @ApiProperty()
    messageTime: number;

    @ApiProperty()
    messageSize: number;
    
    @ApiProperty()
    response: string;

    @ApiProperty()
    from: string;

    @ApiProperty()
    to: string;

    @ApiProperty()
    messageId: string;

    @ApiProperty()
    template: string;

    @ApiProperty()
    id_solicitud: SolicitudesDto;

    @ApiProperty()
    id_contacto: ContactoDto;
}
