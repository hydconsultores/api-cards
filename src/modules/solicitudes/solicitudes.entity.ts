import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CartasIndex } from '../cartas-index/cartas-index.entity';
import { CartasSubTipos } from '../cartas-sub-tipos/cartas-sub-tipos.entity';
import { CartasTipos } from '../cartas-tipos/cartas-tipos.entity';
import { Cartas } from '../cartas/cartas.entity';
import { Reservas } from '../reservas/reservas.entity';

@Entity()
export class Solicitudes {
  @PrimaryGeneratedColumn({
    type: 'integer',
    name: 'id',
  })
  id: number;

  @Column('text', {
    nullable: true,
    name: 'token',
  })
  token: string;

  @Column('text', {
    nullable: true,
    name: 'nombre',
  })
  nombre: string;

  @Column('text', {
    nullable: true,
    name: 'apellido_pat',
  })
  apellido_pat: string;


  @Column('text', {
    nullable: true,
    name: 'apellido_mat',
  })
  apellido_mat: string;


  @Column('text', {
    nullable: true,
    name: 'telefono',
  })
  telefono: string;

  @Column('text', {
    nullable: true,
    name: 'correo',
  })
  correo: string;

  @Column('text', {
    nullable: true,
    name: 'direccion',
  })
  direccion: string;

  @Column('enum', {
    nullable: false,
    default: 'PENDIENTE',
    enum: ['EJECUTADO','PENDIENTE', 'DELETED'],
    name: 'status',
  })
  status: string;

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


  @OneToMany(() => Reservas, (reservas: Reservas) => reservas.id_solicitud)
  id_solicitud: Reservas[];
}