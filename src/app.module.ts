import { Module } from '@nestjs/common';
import { GlobalModule } from './shared/global.module';

import { LenguajesModule } from './modules/lenguajes/lenguajes.module';
import { CondicionesModule } from './modules/condiciones/condiciones.module';
import { EdicionesModule } from './modules/ediciones/ediciones.module';
import { CartasModule } from './modules/cartas/cartas.module';
import { RarezasModule } from './modules/rarezas/rarezas.module';
import { TerminacionesModule } from './modules/terminaciones/terminaciones.module';
import { TiposModule } from './modules/tipos/tipos.module';
import { CartasIndex } from './modules/cartas-index/cartas-index.entity';
import { CartasTipos } from './modules/cartas-tipos/cartas-tipos.entity';
import { ColoresModule } from './modules/colores/colores.module';
import { SubTiposModule } from './modules/sub-tipos/sub-tipos.module';
import { SuperTiposModule } from './modules/super-tipos/super-tipos.module';
import { CartasSubTiposModule } from './modules/cartas-sub-tipos/cartas-sub-tipos.module';
import { CartasSuperTiposModule } from './modules/cartas-super-tipos/cartas-super-tipos.module';
import { CartasTiposModule } from './modules/cartas-tipos/cartas-tipos.module';
import { MenuModule } from './modules/menu/menu.module';
import { HechizosModule } from './modules/hechizos/hechizos.module';
import { LegalitiesModule } from './modules/legalities/legalities.module';
import { CartasLegalitiesModule } from './modules/cartas-legalities/cartas-legalities.module';
import { CartasHechizosModule } from './modules/cartas-hechizos/cartas-hechizos.module';
import { ReservasModule } from './modules/reservas/reservas.module';
import { SolicitudesModule } from './modules/solicitudes/solicitudes.module';
import { MailModule } from './modules/mail/mail.module';
import { ContactoModule } from './modules/contacto/contacto.module';
@Module({
  imports: [GlobalModule, 
    LenguajesModule, 
    CondicionesModule, 
    EdicionesModule,
    CartasModule,
    RarezasModule,
    TerminacionesModule,
    TiposModule,
    CartasIndex,
    CartasTipos,
    ColoresModule,
    SubTiposModule,
    SuperTiposModule,
    CartasSubTiposModule,
    CartasSuperTiposModule,
    CartasTiposModule,
    MenuModule,
    LegalitiesModule,
    CartasLegalitiesModule,
    CartasHechizosModule,
    ReservasModule,
    SolicitudesModule,
    MailModule,
    ContactoModule
  ],
  providers: [],
})
export class AppModule { }
