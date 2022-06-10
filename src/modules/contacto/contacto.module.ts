import { Module } from '@nestjs/common';
import { ContactoController } from './contacto.controller';
import { ContactoService } from './contacto.service';
import { Contacto } from './contacto.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import Config from '../../config/app';
import { JwtModule } from '@nestjs/jwt';
import { MailModule } from '../mail/mail.module';
@Module({
  imports: [
    TypeOrmModule.forFeature([Contacto]),
    MailModule
  ],
  providers: [ContactoService],
  controllers: [ContactoController],
  exports: [ContactoService],
})
export class ContactoModule {}

