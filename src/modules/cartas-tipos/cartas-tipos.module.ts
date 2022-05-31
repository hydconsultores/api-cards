import { Module } from '@nestjs/common';
import { CartasTiposController } from './cartas-tipos.controller';
import { CartasTiposService } from './cartas-tipos.service';
import { CartasTipos } from './cartas-tipos.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import Config from '../../config/app';
import { JwtModule } from '@nestjs/jwt';
@Module({
  imports: [
    TypeOrmModule.forFeature([CartasTipos])
  ],
  providers: [CartasTiposService],
  controllers: [CartasTiposController],
  exports: [CartasTiposService],
})
export class CartasTiposModule {}

