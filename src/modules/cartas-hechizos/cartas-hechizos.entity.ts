import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Cartas } from '../cartas/cartas.entity';
import { Hechizos } from '../hechizos/hechizos.entity';
import { Legalities } from '../legalities/legalities.entity';
import { SubTipos } from '../sub-tipos/sub-tipos.entity';
import { SuperTipos } from '../super-tipos/super-tipos.entity';
import { Tipos } from '../tipos/tipos.entity';

@Entity()
export class CartasHechizos {
  @PrimaryGeneratedColumn({
    type: 'integer',
    name: 'id',
  })
  id: number;

  @ManyToOne(() => Cartas, (table: Cartas) => table.id_carta_hechizo, {})
  @JoinColumn({ name: 'id_carta' })
  id_carta: Cartas;

  @ManyToOne(() => Hechizos, (table: Hechizos) => table.id_hechizo, {})
  @JoinColumn({ name: 'id_hechizo' })
  id_hechizo: Hechizos;

  
  @Column('text', {
    nullable: false,
    name: 'valor',
  })
  valor: string;

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