import { Module } from '@nestjs/common';
import { CartasIndexController } from './cartas-index.controller';
import { CartasIndexService } from './cartas-index.service';
import { CartasIndex } from './cartas-index.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import Config from '../../config/app';
import { JwtModule } from '@nestjs/jwt';
@Module({
  imports: [
    TypeOrmModule.forFeature([CartasIndex])
  ],
  providers: [CartasIndexService],
  controllers: [CartasIndexController],
  exports: [CartasIndexService],
})
export class CartasIndexModule {}

