import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CartasHechizos } from '../cartas-hechizos/cartas-hechizos.entity';
import { CartasIndex } from '../cartas-index/cartas-index.entity';
import { CartasLegalities } from '../cartas-legalities/cartas-legalities.entity';
import { CartasSubTipos } from '../cartas-sub-tipos/cartas-sub-tipos.entity';
import { CartasSuperTipos } from '../cartas-super-tipos/cartas-super-tipos.entity';
import { CartasTipos } from '../cartas-tipos/cartas-tipos.entity';
import { Ediciones } from '../ediciones/ediciones.entity';
import { Reservas } from '../reservas/reservas.entity';

@Entity()
export class Cartas {
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
  id_edicion: Ediciones;
  
  @Column('varchar', {
    nullable: false,
    name: 'numero',
  })
  numero: string;

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


    
  @OneToMany(() => CartasIndex, (cartasIndex: CartasIndex) => cartasIndex.id_carta)
  id_carta: CartasIndex[];

  @OneToMany(() => CartasSubTipos, (cartasSubTipos: CartasSubTipos) => cartasSubTipos.id_carta)
  carta_sub_tipo: CartasSubTipos[];

  @OneToMany(() => CartasTipos, (cartasTipos: CartasTipos) => cartasTipos.id_carta)
  carta_tipo: CartasTipos[];

  @OneToMany(() => CartasSuperTipos, (cartasSuperTipos: CartasSuperTipos) => cartasSuperTipos.id_carta)
  carta_super_tipo: CartasSuperTipos[];

  @OneToMany(() => CartasHechizos, (cartasHechizos: CartasHechizos) => cartasHechizos.id_carta)
  id_carta_hechizo: CartasHechizos[];

  @OneToMany(() => CartasLegalities, (cartasLegalities: CartasLegalities) => cartasLegalities.id_carta)
  carta_legalities: CartasLegalities[];

  @OneToMany(() => Reservas, (reservas: Reservas) => reservas.id_carta)
  id_reserva: Reservas[];
}