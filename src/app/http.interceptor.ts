import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AppInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const newHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      token: localStorage.getItem('token') ? localStorage.getItem('token') as string : ''
    });
    //clone request and change header
    let clone = request.clone({ headers: newHeaders });
    return next.handle(clone);
  }
}
