import { Module } from '@nestjs/common';
import { TerminacionesController } from './terminaciones.controller';
import { TerminacionesService } from './terminaciones.service';
import { Terminaciones } from './terminaciones.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import Config from '../../config/app';
import { JwtModule } from '@nestjs/jwt';
@Module({
  imports: [
    TypeOrmModule.forFeature([Terminaciones])
  ],
  providers: [TerminacionesService],
  controllers: [TerminacionesController],
  exports: [TerminacionesService],
})
export class TerminacionesModule {}

