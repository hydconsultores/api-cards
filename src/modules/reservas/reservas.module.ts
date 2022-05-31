import { Module } from '@nestjs/common';
import { ReservasController } from './reservas.controller';
import { ReservasService } from './reservas.service';
import { Reservas } from './reservas.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import Config from '../../config/app';
import { JwtModule } from '@nestjs/jwt';
import { CartasIndexModule } from '../cartas-index/cartas-index.module';
import { Cartas } from '../cartas/cartas.entity';
import { SolicitudesModule } from '../solicitudes/solicitudes.module';
@Module({
  imports: [
    TypeOrmModule.forFeature([Reservas]),
    CartasIndexModule,
    Cartas,
    SolicitudesModule
  ],
  providers: [ReservasService],
  controllers: [ReservasController],
  exports: [ReservasService],
})
export class ReservasModule {}

