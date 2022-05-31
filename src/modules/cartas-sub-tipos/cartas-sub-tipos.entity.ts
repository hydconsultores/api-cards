import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Cartas } from '../cartas/cartas.entity';
import { SubTipos } from '../sub-tipos/sub-tipos.entity';
import { SuperTipos } from '../super-tipos/super-tipos.entity';
import { Tipos } from '../tipos/tipos.entity';

@Entity()
export class CartasSubTipos {
  @PrimaryGeneratedColumn({
    type: 'integer',
    name: 'id',
  })
  id: number;

  @ManyToOne(() => Cartas, (table: Cartas) => table.carta_sub_tipo, {})
  @JoinColumn({ name: 'id_carta' })
  id_carta: Cartas;

  @ManyToOne(() => SubTipos, (table: SubTipos) => table.id_sub_tipo, {})
  @JoinColumn({ name: 'id_sub_tipo' })
  id_sub_tipo: SubTipos;

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
  
}