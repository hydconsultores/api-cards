import { Module } from '@nestjs/common';
import { LegalitiesController } from './legalities.controller';
import { LegalitiesService } from './legalities.service';
import { Legalities } from './legalities.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import Config from '../../config/app';
import { JwtModule } from '@nestjs/jwt';
@Module({
  imports: [
    TypeOrmModule.forFeature([Legalities])
  ],
  providers: [LegalitiesService],
  controllers: [LegalitiesController],
  exports: [LegalitiesService],
})
export class LegalitiesModule {}

