import { Module } from '@nestjs/common';
import { TiposController } from './tipos.controller';
import { TiposService } from './tipos.service';
import { Tipos } from './tipos.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import Config from '../../config/app';
import { JwtModule } from '@nestjs/jwt';
@Module({
  imports: [
    TypeOrmModule.forFeature([Tipos])
  ],
  providers: [TiposService],
  controllers: [TiposController],
  exports: [TiposService],
})
export class TiposModule {}

