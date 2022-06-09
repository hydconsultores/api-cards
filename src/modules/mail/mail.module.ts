import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { join } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Mail } from './mail.entity';
import { MailController } from './mail.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Mail]),
    MailerModule.forRoot({
      // transport: 'smtps://user@example.com:topsecret@smtp.example.com',
      // or
      transport: {
        host: process.env.HOST_MAIL, 
        secure: process.env.SECURE_MAIL == 'true' ? true : false,
        port:  parseInt(process.env.PORT_MAIL),
        auth: {
          user: process.env.USER_MAIL,
          pass: process.env.PASS_MAIL,
        },
      },
      defaults: {
        from: '"no-reply" <hydconsu@hydconsultores.cl>',
      },
      template: {
        dir: join(__dirname, 'templates'),
        adapter: new HandlebarsAdapter(), // or new PugAdapter() or new EjsAdapter()
        options: {
          strict: true,
        },
      },
    }),
  ],
  providers: [MailService],
  controllers: [MailController],
  exports: [MailService], // 👈 export for DI
})
export class MailModule {}