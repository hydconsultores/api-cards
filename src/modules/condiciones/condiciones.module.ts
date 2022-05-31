import { Module } from '@nestjs/common';
import { CondicionesController } from './condiciones.controller';
import { CondicionesService } from './condiciones.service';
import { Condiciones } from './condiciones.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import Config from '../../config/app';
import { JwtModule } from '@nestjs/jwt';
@Module({
  imports: [
    TypeOrmModule.forFeature([Condiciones])
  ],
  providers: [CondicionesService],
  controllers: [CondicionesController],
  exports: [CondicionesService],
})
export class CondicionesModule {}

