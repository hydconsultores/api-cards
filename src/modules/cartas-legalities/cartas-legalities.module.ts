import { Module } from '@nestjs/common';
import { CartasLegalitiesController } from './cartas-legalities.controller';
import { CartasLegalitiesService } from './cartas-legalities.service';
import { CartasLegalities } from './cartas-legalities.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import Config from '../../config/app';
import { JwtModule } from '@nestjs/jwt';
@Module({
  imports: [
    TypeOrmModule.forFeature([CartasLegalities])
  ],
  providers: [CartasLegalitiesService],
  controllers: [CartasLegalitiesController],
  exports: [CartasLegalitiesService],
})
export class CartasLegalitiesModule {}

