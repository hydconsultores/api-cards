import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Contacto } from '../contacto/contacto.entity';
import { SolicitudesDto } from '../solicitudes/solicitudes.dto';
import { Solicitudes } from '../solicitudes/solicitudes.entity';

@Entity()
export class Mail {
    @PrimaryGeneratedColumn({
        type: 'integer',
        name: 'id',
      })
      id: number;

      @Column('text', {
        nullable: false,
        name: 'accepted',
      })
      accepted: string;


      @Column('text', {
        nullable: false,
        name: 'rejected',
      })
      rejected: string;

      @Column('numeric', {
        nullable: false,
        name: 'envelopeTime',
      })
      envelopeTime: number;

      @Column('numeric', {
        nullable: false,
        name: 'messageTime',
      })
      messageTime: number;

      @Column('numeric', {
        nullable: false,
        name: 'messageSize',
      })
      messageSize: number;

      @Column('text', {
        nullable: false,
        name: 'response',
      })
      response: string;

      @Column('text', {
        nullable: false,
        name: 'from',
      })
      from: string;

      @Column('text', {
        nullable: false,
        name: 'to',
      })
      to: string;


      @Column('text', {
        nullable: false,
        name: 'messageId',
      })
      messageId: string;

      @Column('text', {
        nullable: false,
        name: 'template',
      })
      template: string;

      @ManyToOne(() => Solicitudes, (table: Solicitudes) => table.id_solicitud_mail, {})
      @JoinColumn({ name: 'id_solicitud' })
      id_solicitud: Solicitudes;

      @ManyToOne(() => Contacto, (table: Contacto) => table.id_contacto, {})
      @JoinColumn({ name: 'id_contacto' })
      id_contacto: Contacto;
}
