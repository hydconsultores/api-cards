import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CartasIndex } from '../cartas-index/cartas-index.entity';
import { CartasSubTipos } from '../cartas-sub-tipos/cartas-sub-tipos.entity';
import { CartasTipos } from '../cartas-tipos/cartas-tipos.entity';
import { Cartas } from '../cartas/cartas.entity';
import { Solicitudes } from '../solicitudes/solicitudes.entity';

@Entity()
export class Reservas {
  @PrimaryGeneratedColumn({
    type: 'integer',
    name: 'id',
  })
  id: number;


  @ManyToOne(() => CartasIndex, (table: CartasIndex) => table.id_reserva, {})
  @JoinColumn({ name: 'id_carta_index' })
  id_carta_index: CartasIndex;
  
  @ManyToOne(() => Cartas, (table: Cartas) => table.id_reserva, {})
  @JoinColumn({ name: 'id_carta' })
  id_carta: Cartas;

  @ManyToOne(() => Solicitudes, (table: Solicitudes) => table.id_solicitud, {})
  @JoinColumn({ name: 'id_solicitud' })
  id_solicitud: Solicitudes;

  @Column('numeric', {
    nullable: false,
    name: 'cantidad',
  })
  cantidad: number;

  @Column('numeric', {
    nullable: false,
    name: 'precio_unitario',
  })
  precio_unitario: number;

  @Column('numeric', {
    nullable: false,
    name: 'stock',
  })
  stock: number;


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


  
}