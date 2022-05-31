import { Module } from '@nestjs/common';
import { SuperTiposController } from './super-tipos.controller';
import { SuperTiposService } from './super-tipos.service';
import { SuperTipos } from './super-tipos.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import Config from '../../config/app';
import { JwtModule } from '@nestjs/jwt';
@Module({
  imports: [
    TypeOrmModule.forFeature([SuperTipos])
  ],
  providers: [SuperTiposService],
  controllers: [SuperTiposController],
  exports: [SuperTiposService],
})
export class SuperTiposModule {}

