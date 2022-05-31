import { Module } from '@nestjs/common';
import { EdicionesController } from './ediciones.controller';
import { EdicionesService } from './ediciones.service';
import { Ediciones } from './ediciones.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import Config from '../../config/app';
import { JwtModule } from '@nestjs/jwt';
@Module({
  imports: [
    TypeOrmModule.forFeature([Ediciones])
  ],
  providers: [EdicionesService],
  controllers: [EdicionesController],
  exports: [EdicionesService],
})
export class EdicionesModule {}

