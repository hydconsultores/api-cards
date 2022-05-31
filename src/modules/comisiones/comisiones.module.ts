import { Module } from '@nestjs/common';
import { ComisionesController } from './comisiones.controller';
import { ComisionesService } from './comisiones.service';
import { Comisiones } from './comisiones.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import Config from '../../config/app';
import { JwtModule } from '@nestjs/jwt';
@Module({
  imports: [
    TypeOrmModule.forFeature([Comisiones])
  ],
  providers: [ComisionesService],
  controllers: [ComisionesController],
  exports: [ComisionesService],
})
export class ComisionesModule {}

