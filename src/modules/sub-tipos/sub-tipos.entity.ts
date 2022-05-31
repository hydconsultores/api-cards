import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CartasSubTipos } from '../cartas-sub-tipos/cartas-sub-tipos.entity';
import { CartasTipos } from '../cartas-tipos/cartas-tipos.entity';

@Entity()
export class SubTipos {
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

  @OneToMany(() => CartasSubTipos, (cartasSubTipos: CartasSubTipos) => cartasSubTipos.id_sub_tipo)
  id_sub_tipo: CartasSubTipos[];
  
}