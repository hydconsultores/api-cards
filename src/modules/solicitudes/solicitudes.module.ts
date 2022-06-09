import { forwardRef, Module } from '@nestjs/common';
import { SolicitudesController } from './solicitudes.controller';
import { SolicitudesService } from './solicitudes.service';
import { Solicitudes } from './solicitudes.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReservasModule } from '../reservas/reservas.module';
import { MailModule } from '../mail/mail.module';
@Module({
  imports: [
    TypeOrmModule.forFeature([Solicitudes]),
    forwardRef(() => ReservasModule),
    MailModule
  ],
  providers: [SolicitudesService],
  controllers: [SolicitudesController],
  exports: [SolicitudesService],
})
export class SolicitudesModule {}

