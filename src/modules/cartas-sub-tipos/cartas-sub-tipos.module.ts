import { Module } from '@nestjs/common';
import { CartasSubTiposController } from './cartas-sub-tipos.controller';
import { CartasSubTiposService } from './cartas-sub-tipos.service';
import { CartasSubTipos } from './cartas-sub-tipos.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import Config from '../../config/app';
import { JwtModule } from '@nestjs/jwt';
@Module({
  imports: [
    TypeOrmModule.forFeature([CartasSubTipos])
  ],
  providers: [CartasSubTiposService],
  controllers: [CartasSubTiposController],
  exports: [CartasSubTiposService],
})
export class CartasSubTiposModule {}

