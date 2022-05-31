import { Module } from '@nestjs/common';
import { RarezasController } from './rarezas.controller';
import { RarezasService } from './rarezas.service';
import { Rarezas } from './rarezas.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import Config from '../../config/app';
import { JwtModule } from '@nestjs/jwt';
@Module({
  imports: [
    TypeOrmModule.forFeature([Rarezas])
  ],
  providers: [RarezasService],
  controllers: [RarezasController],
  exports: [RarezasService],
})
export class RarezasModule {}

