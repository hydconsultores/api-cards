import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Mail } from './mail.entity';
import { MailerService } from '@nestjs-modules/mailer';
import { Repository } from 'typeorm';
import { SolicitudesDto } from '../solicitudes/solicitudes.dto';
import { MailDto } from './mail.dto';
import { ContactoDto } from '../contacto/contacto.dto';

@Injectable()
export class MailService {
  constructor(
    @InjectRepository(Mail)
    private readonly mailRepository: Repository<Mail>,
    private readonly mailerService:MailerService) {}

  async sendUserConfirmation(asunto: string, template:string, user: any, correo: string, token: string, solicitud: SolicitudesDto) {
    try{
      console.log("asunto",asunto)
      console.log("template",template)
      console.log("user",user)
      console.log("correo",correo)
      console.log("token",token)
      let emailSend;
      if(template == 'soporte'){
        emailSend= await this.mailerService.sendMail({
          to: correo,
          subject: asunto,
          template: template,
          context: { 
            name: user,
            token: token,
            nombre:solicitud.nombre+" "+solicitud.apellido_pat,
            correo:solicitud.correo,
            telefono:solicitud.telefono
          },
        });
        let mail = new MailDto();
        mail.accepted = emailSend.accepted.toString();
        mail.rejected = emailSend.rejected.toString();
        mail.envelopeTime = emailSend.envelopeTime;
        mail.messageTime = emailSend.messageTime;
        mail.messageSize = emailSend.messageSize;
        mail.response = emailSend.response;
        mail.from = emailSend.envelope.from;
        mail.to = emailSend.envelope.to;
        mail.messageId = emailSend.messageId;
        mail.id_solicitud = solicitud;
        mail.template = template;
  
        this.mailRepository.save(mail);

        return;
      }
      
      emailSend= await this.mailerService.sendMail({
        to: correo,
        subject: asunto,
        template: template,
        context: { 
          name: user,
          token: token
        },
      });
      //almacenar en BD

      let mail = new MailDto();
      mail.accepted = emailSend.accepted.toString();
      mail.rejected = emailSend.rejected.toString();
      mail.envelopeTime = emailSend.envelopeTime;
      mail.messageTime = emailSend.messageTime;
      mail.messageSize = emailSend.messageSize;
      mail.response = emailSend.response;
      mail.from = emailSend.envelope.from;
      mail.to = emailSend.envelope.to;
      mail.messageId = emailSend.messageId;
      mail.id_solicitud = solicitud;
      mail.template = template;

      this.mailRepository.save(mail);
      console.log("mail",mail)
    } catch (ex) {

    }

  }

  async sendUserContacto(asunto: string, template:string, user: any, correo: string, contacto: ContactoDto) {
    try{
      console.log("asunto",asunto)
      console.log("template",template)
      console.log("user",user)
      console.log("correo",correo)

      let emailSend= await this.mailerService.sendMail({
        to: correo,
        subject: asunto,
        template: template,
        context: { 
          name: user,
          nombre: contacto.nombre,
          correo: contacto.correo,
          asunto: contacto.asunto,
          telefono: contacto.telefono,
          comentario: contacto.comentario
        },
      });
      //almacenar en BD

      let mail = new MailDto();
      mail.accepted = emailSend.accepted.toString();
      mail.rejected = emailSend.rejected.toString();
      mail.envelopeTime = emailSend.envelopeTime;
      mail.messageTime = emailSend.messageTime;
      mail.messageSize = emailSend.messageSize;
      mail.response = emailSend.response;
      mail.from = emailSend.envelope.from;
      mail.to = emailSend.envelope.to;
      mail.messageId = emailSend.messageId;
      mail.id_contacto = contacto;
      mail.template = template;

      this.mailRepository.save(mail);
      console.log("mail",mail)
    } catch (ex) {

    }

  }
}
