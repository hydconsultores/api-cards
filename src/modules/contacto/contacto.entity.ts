import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CartasIndex } from '../cartas-index/cartas-index.entity';
import { Cartas } from '../cartas/cartas.entity';
import { Mail } from '../mail/mail.entity';
import { Menu } from '../menu/menu.entity';

@Entity()
export class Contacto {
  @PrimaryGeneratedColumn({
    type: 'integer',
    name: 'id',
  })
  id: number;

  @Column('text', {
    nullable: false,
    name: 'nombre',
  })
  nombre: string;

  @Column('text', {
    nullable: false,
    name: 'asunto',
  })
  asunto: string;

  @Column('text', {
    nullable: false,
    name: 'correo',
  })
  correo: string;

  @Column('text', {
    nullable: false,
    name: 'telefono',
  })
  telefono: string;

  @Column('text', {
    nullable: false,
    name: 'comentario',
  })
  comentario: string;

  @Column('timestamp', {
    nullable: false,
    default: () => 'now()',
    name: 'created_at',
  })
  created_at: Date;

  @Column('timestamp', {
    nullable: true,
    name: 'updated_at',
  })
  updated_at: Date | null;

  @OneToMany(() => Mail, (mail: Mail) => mail.id_contacto)
  id_contacto: Mail[];

}