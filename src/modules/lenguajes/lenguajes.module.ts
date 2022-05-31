import { Module } from '@nestjs/common';
import { LenguajesController } from './lenguajes.controller';
import { LenguajesService } from './lenguajes.service';
import { Lenguajes } from './lenguajes.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import Config from '../../config/app';
import { JwtModule } from '@nestjs/jwt';
@Module({
  imports: [
    TypeOrmModule.forFeature([Lenguajes])
  ],
  providers: [LenguajesService],
  controllers: [LenguajesController],
  exports: [LenguajesService],
})
export class LenguajesModule {}

