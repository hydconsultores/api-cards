import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CartasIndex } from '../cartas-index/cartas-index.entity';
import { CartasLegalities } from '../cartas-legalities/cartas-legalities.entity';

@Entity()
export class Legalities {
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

  /*@OneToMany(() => CartasIndex, (cartasIndex: CartasIndex) => cartasIndex.id_hechizo)
  id_hechizo: CartasIndex[];*/

  @OneToMany(() => CartasLegalities, (cartasLegalities: CartasLegalities) => cartasLegalities.id_legalities)
  id_legalities: CartasLegalities[];

}