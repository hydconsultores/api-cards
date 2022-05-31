import { Module } from '@nestjs/common';
import { ColoresController } from './colores.controller';
import { ColoresService } from './colores.service';
import { Colores } from './colores.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import Config from '../../config/app';
import { JwtModule } from '@nestjs/jwt';
@Module({
  imports: [
    TypeOrmModule.forFeature([Colores])
  ],
  providers: [ColoresService],
  controllers: [ColoresController],
  exports: [ColoresService],
})
export class ColoresModule {}

