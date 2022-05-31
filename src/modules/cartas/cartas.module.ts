import { Module } from '@nestjs/common';
import { CartasController } from './cartas.controller';
import { CartasService } from './cartas.service';
import { Cartas } from './cartas.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import Config from '../../config/app';
import { JwtModule } from '@nestjs/jwt';
import { LenguajesModule } from '../lenguajes/lenguajes.module';
import { SuperTiposModule } from '../super-tipos/super-tipos.module';
import { TiposModule } from '../tipos/tipos.module';
import { SubTiposModule } from '../sub-tipos/sub-tipos.module';
import { ColoresModule } from '../colores/colores.module';
import { CondicionesModule } from '../condiciones/condiciones.module';
import { EdicionesModule } from '../ediciones/ediciones.module';
import { RarezasModule } from '../rarezas/rarezas.module';
import { TerminacionesModule } from '../terminaciones/terminaciones.module';
import { CartasSuperTiposModule } from '../cartas-super-tipos/cartas-super-tipos.module';
import { CartasSubTiposModule } from '../cartas-sub-tipos/cartas-sub-tipos.module';
import { CartasTiposModule } from '../cartas-tipos/cartas-tipos.module';
import { CartasIndexModule } from '../cartas-index/cartas-index.module';
import { LegalitiesModule } from '../legalities/legalities.module';
import { CartasLegalitiesModule } from '../cartas-legalities/cartas-legalities.module';
@Module({
  imports: [
    TypeOrmModule.forFeature([Cartas]),
    LenguajesModule,
    SuperTiposModule,
    TiposModule,
    SubTiposModule,
    ColoresModule,
    CondicionesModule,
    EdicionesModule,
    RarezasModule,
    TerminacionesModule,
    CartasSuperTiposModule,
    CartasSubTiposModule,
    CartasTiposModule,
    CartasIndexModule,
    LegalitiesModule,
    CartasLegalitiesModule
  ],
  providers: [CartasService],
  controllers: [CartasController],
  exports: [CartasService],
})
export class CartasModule {}

