import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CartasIndex } from '../cartas-index/cartas-index.entity';
import { Cartas } from '../cartas/cartas.entity';
import { Menu } from '../menu/menu.entity';

@Entity()
export class Ediciones {
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


  @OneToMany(() => CartasIndex, (cartasIndex: CartasIndex) => cartasIndex.id_edicion)
  id_edicion: CartasIndex[];

  @OneToMany(() => Cartas, (cartas: Cartas) => cartas.id_edicion)
  id_edicion_carta: Cartas[];

  @OneToMany(() => Menu, (menu: Menu) => menu.id_edicion_menu)
  id_edicion_menu: Menu[];
}