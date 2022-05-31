import { Module } from '@nestjs/common';
import { CartasHechizosController } from './cartas-hechizos.controller';
import { CartasHechizosService } from './cartas-hechizos.service';
import { CartasHechizos } from './cartas-hechizos.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import Config from '../../config/app';
import { JwtModule } from '@nestjs/jwt';
@Module({
  imports: [
    TypeOrmModule.forFeature([CartasHechizos])
  ],
  providers: [CartasHechizosService],
  controllers: [CartasHechizosController],
  exports: [CartasHechizosService],
})
export class CartasHechizosModule {}

