import { Module } from '@nestjs/common';
import { HechizosController } from './hechizos.controller';
import { HechizosService } from './hechizos.service';
import { Hechizos } from './hechizos.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import Config from '../../config/app';
import { JwtModule } from '@nestjs/jwt';
@Module({
  imports: [
    TypeOrmModule.forFeature([Hechizos])
  ],
  providers: [HechizosService],
  controllers: [HechizosController],
  exports: [HechizosService],
})
export class HechizosModule {}

