import { Injectable, Provider } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable()
class AppInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    console.log(request);

    if (request.url.startsWith('api')) {
      request = request.clone({
        url: request.url.replace('api', environment.apiUrl),
      });
    }

    return next.handle(request);
  }
}

export const appInterceptorProvider: Provider = {
  useClass: AppInterceptor,
  multi: true,
  provide: HTTP_INTERCEPTORS,
};
