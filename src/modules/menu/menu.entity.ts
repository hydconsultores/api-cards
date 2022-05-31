import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CartasIndex } from '../cartas-index/cartas-index.entity';
import { CartasSubTipos } from '../cartas-sub-tipos/cartas-sub-tipos.entity';
import { CartasSuperTipos } from '../cartas-super-tipos/cartas-super-tipos.entity';
import { CartasTipos } from '../cartas-tipos/cartas-tipos.entity';
import { Ediciones } from '../ediciones/ediciones.entity';

@Entity()
export class Menu {
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

  @ManyToOne(() => Ediciones, (table: Ediciones) => table.id_edicion_carta, {})
  @JoinColumn({ name: 'id_edicion' })
  id_edicion_menu: Ediciones;
  
  @Column('varchar', {
    nullable: false,
    name: 'pisicion',
  })
  pisicion: string;

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