import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import Config from './config/app';
import * as bodyParser from 'body-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { LoggingInterceptor } from './shared/interceptors/logging.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: true,
      preflightContinue: false,
    },
  });
  
 //app.useGlobalInterceptors(new LoggingInterceptor());
  app.use(bodyParser.json({limit: '50mb'}));
  app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
  app.use(bodyParser.text({limit: '50mb'}));
  app.setGlobalPrefix('api');
  const config = new DocumentBuilder()
    .setTitle('API')
    .setDescription('API')
    .setVersion('1.0')
    .addTag('cats')
    .build();

  await app.listen(Config.port);
}
bootstrap();
