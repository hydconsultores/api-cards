import {
  Controller,
  Get,
  UseGuards,
  Param,
  Post,
  Body,
  Request,
  Put,
} from '@nestjs/common';
import { MailService } from './mail.service';
import { MailDto } from './mail.dto';
import { Mail } from './mail.entity';

@Controller('mail')
export class MailController {
  constructor(private readonly menuService: MailService) {}

  
  @Get('/test')
  async test(): Promise<any> {
    this.menuService.sendUserConfirmation("Gerardo", "wena wena");
    return 1;
  }
}
