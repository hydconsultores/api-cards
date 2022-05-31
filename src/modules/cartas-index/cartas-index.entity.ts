import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Cartas } from '../cartas/cartas.entity';
import { Colores } from '../colores/colores.entity';
import { Condiciones } from '../condiciones/condiciones.entity';
import { Ediciones } from '../ediciones/ediciones.entity';
import { Hechizos } from '../hechizos/hechizos.entity';
import { Lenguajes } from '../lenguajes/lenguajes.entity';
import { Rarezas } from '../rarezas/rarezas.entity';
import { Reservas } from '../reservas/reservas.entity';
import { SuperTipos } from '../super-tipos/super-tipos.entity';
import { Terminaciones } from '../terminaciones/terminaciones.entity';
import { Tipos } from '../tipos/tipos.entity';

@Entity()
export class CartasIndex {
  @PrimaryGeneratedColumn({
    type: 'integer',
    name: 'id',
  })
  id: number;

  @ManyToOne(() => Cartas, (table: Cartas) => table.id_carta, {})
  @JoinColumn({ name: 'id_carta' })
  id_carta: Cartas;

  @ManyToOne(() => Condiciones, (table: Condiciones) => table.id_condicion, {})
  @JoinColumn({ name: 'id_condicion' })
  id_condicion: Condiciones;

  @ManyToOne(() => Ediciones, (table: Ediciones) => table.id_edicion, {})
  @JoinColumn({ name: 'id_edicion' })
  id_edicion: Ediciones;
  
  @ManyToOne(() => Lenguajes, (table: Lenguajes) => table.id_lenguaje, {})
  @JoinColumn({ name: 'id_lenguaje' })
  id_lenguaje: Lenguajes;

  @ManyToOne(() => Rarezas, (table: Rarezas) => table.id_rareza, {})
  @JoinColumn({ name: 'id_rareza' })
  id_rareza: Rarezas;


  /*@ManyToOne(() => Hechizos, (table: Hechizos) => table.id_hechizo, {})
  @JoinColumn({ name: 'id_hechizo' })
  id_hechizo: Hechizos;*/


  @ManyToOne(() => Terminaciones, (table: Terminaciones) => table.id_terminacion, {})
  @JoinColumn({ name: 'id_terminacion' })
  id_terminacion: Terminaciones;

  @ManyToOne(() => Colores, (table: Colores) => table.id_color, {})
  @JoinColumn({ name: 'id_color' })
  id_color: Colores;

  @Column('numeric', {
    nullable: false,
    name: 'stock',
  })
  stock: number;

  @Column('numeric', {
    nullable: false,
    name: 'precio',
  })
  precio: number;

  @Column('varchar', {
    nullable: true,
    name: 'imagen',
  })
  imagen: string;

  @Column('varchar', {
    nullable: false,
    name: 'nombre',
  })
  nombre: string;

  @Column('text', {
    nullable: true,
    name: 'texto',
  })
  texto: string;

  @Column('text', {
    nullable: true,
    name: 'flavor',
  })
  flavor: string;

  @Column('varchar', {
    nullable: true,
    name: 'tipo_concatenado',
  })
  tipo_concatenado: string;

  @Column('enum', {
    nullable: false,
    default: 'ACTIVE',
    enum: ['ACTIVE','DESACTIVE', 'DELETED'],
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

  @OneToMany(() => Reservas, (reservas: Reservas) => reservas.id_carta_index)
  id_reserva: Reservas[];
  
}