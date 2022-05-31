import { Module } from '@nestjs/common';
import { SubTiposController } from './sub-tipos.controller';
import { SubTiposService } from './sub-tipos.service';
import { SubTipos } from './sub-tipos.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import Config from '../../config/app';
import { JwtModule } from '@nestjs/jwt';
@Module({
  imports: [
    TypeOrmModule.forFeature([SubTipos])
  ],
  providers: [SubTiposService],
  controllers: [SubTiposController],
  exports: [SubTiposService],
})
export class SubTiposModule {}

