import { Module } from '@nestjs/common';
import { CartasSuperTiposController } from './cartas-super-tipos.controller';
import { CartasSuperTiposService } from './cartas-super-tipos.service';
import { CartasSuperTipos } from './cartas-super-tipos.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import Config from '../../config/app';
import { JwtModule } from '@nestjs/jwt';
@Module({
  imports: [
    TypeOrmModule.forFeature([CartasSuperTipos])
  ],
  providers: [CartasSuperTiposService],
  controllers: [CartasSuperTiposController],
  exports: [CartasSuperTiposService],
})
export class CartasSuperTiposModule {}

