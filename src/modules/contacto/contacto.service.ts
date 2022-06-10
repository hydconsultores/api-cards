import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Contacto } from './contacto.entity';
import { Repository } from 'typeorm';
import { ContactoDto } from './contacto.dto';
import { MailService } from '../mail/mail.service';

@Injectable()
export class ContactoService {
  constructor(
    @InjectRepository(Contacto)
    private readonly contactoRepository: Repository<Contacto>,
    private readonly mailService: MailService
  ) { }

  async create(edicion:ContactoDto): Promise<Contacto> {
    let contacto = await this.contactoRepository.save(edicion);

    this.mailService.sendUserContacto(
      "Formulario de contacto",
      "contacto",
      "Equipo",
      "14.gerardo.matias@gmail.com",//"figs021@gmail.com",
      contacto); 
    return contacto
  }

}
