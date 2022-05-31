import { Module } from '@nestjs/common';
import { SolicitudesController } from './solicitudes.controller';
import { SolicitudesService } from './solicitudes.service';
import { Solicitudes } from './solicitudes.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import Config from '../../config/app';
import { JwtModule } from '@nestjs/jwt';
import { CartasIndexModule } from '../cartas-index/cartas-index.module';
import { Cartas } from '../cartas/cartas.entity';
@Module({
  imports: [
    TypeOrmModule.forFeature([Solicitudes]),
    CartasIndexModule,
    Cartas
  ],
  providers: [SolicitudesService],
  controllers: [SolicitudesController],
  exports: [SolicitudesService],
})
export class SolicitudesModule {}

