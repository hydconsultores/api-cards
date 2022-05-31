import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { IncomingMessage } from 'http';
import { Logger } from '@nestjs/common';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const incomming: IncomingMessage = context.getArgs()[0];
    const controller = context.getClass().name;
    const url = incomming.url;
    const method = incomming.method;

    const now = Date.now();
    return next
      .handle()
      .pipe(
        tap(() =>
          Logger.log(
            `Request ${method} a ${url} tardó ${Date.now() - now}ms`,
            controller,
          ),
        ),
      );
  }
}
