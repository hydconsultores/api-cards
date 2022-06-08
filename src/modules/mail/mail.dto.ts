import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class MailDto {
    @ApiPropertyOptional()
    @ApiProperty()
    id?: number;
}
