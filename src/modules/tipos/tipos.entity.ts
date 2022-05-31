import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CartasTipos } from '../cartas-tipos/cartas-tipos.entity';

@Entity()
export class Tipos {
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

  @OneToMany(() => CartasTipos, (cartasTipo: CartasTipos) => cartasTipo.id_tipo)
  id_tipo: CartasTipos[];
  
}