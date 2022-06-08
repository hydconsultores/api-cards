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
        host: 'mail.hydconsultores.cl',
        secure: false,
        auth: {
          user: '_mainaccount@hydconsultores.cl',
          pass: '0NN-T6ewD1.ub9',
        },
      },
      defaults: {
        from: '"No Reply" <noreply@example.com>',
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