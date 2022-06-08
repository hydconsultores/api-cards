import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Mail } from './mail.entity';
import { MailerService } from '@nestjs-modules/mailer';
import { Repository } from 'typeorm';

@Injectable()
export class MailService {
  constructor(
    @InjectRepository(Mail)
    private readonly mailRepository: Repository<Mail>,
    private readonly mailerService:MailerService) {}

  async sendUserConfirmation(user: any, token: string) {
    const url = `example.com/auth/confirm?token=${token}`;

      await this.mailerService.sendMail({
      to: "14.gerardo.matias@gmail.com",
      // from: '"Support Team" <support@example.com>', // override default from
      subject: 'Welcome to Nice App! Confirm your Email',
      template: 'confirmation', // `.hbs` extension is appended automatically
      context: { // ✏️ filling curly brackets with content
        name: user,
        url,
      },
    });
  }
}
