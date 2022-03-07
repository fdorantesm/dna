import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { type } from 'ramda';

export interface Response<T> {
  statusCode: number;
  data?: T;
}

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    return next.handle().pipe(
      map((data?: any) => {
        const response = context.switchToHttp().getResponse();

        if ([undefined].includes(data)) {
          response.status(204);
          return;
        } else if (data === null) {
          response.status(404);
          return;
        }

        return {
          data,
          statusCode: context.switchToHttp().getResponse().statusCode,
          type: type(data),
        };
      }),
    );
  }
}
