import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';

@Injectable()
export class WrapperDataInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map(body => {
        const isBodyNull = !body;
        const isMetaAttributeDefined = 'meta' in body;
        return isBodyNull || isMetaAttributeDefined ? body : { data: body };
      })
    );
  }
}
//O operador map recebe o valor que está sendo emitido pelo Observable. Normalmente, em um contexto de uma requisição HTTP, esse valor é o body da resposta. Portanto, quando você faz map(body => { ... }), você está lidando com o body da resposta que foi gerada pelo manipulador de rota.
