import { Global, Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import Config from '../config/app';
import { UserStrategy } from './strategy/user.strategy';
import { AdminStrategy } from './strategy/admin.strategy';
import { SuperStrategy } from './strategy/super.strategy';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRoot(Config.database as TypeOrmModuleOptions),
  ],
  providers: [UserStrategy, AdminStrategy, SuperStrategy],
  exports: [],
})
export class GlobalModule {}
