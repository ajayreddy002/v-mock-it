import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs';
import { ErrorHandlerService } from './error-handler.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private error: ErrorHandlerService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return new Observable((observer) => {
      next
        .handle(request)
        .pipe(
          catchError((err: HttpErrorResponse) => {
            this.error.handleError(err);
            return of(null);
          })
        )
        .subscribe((res) => {
          if (res instanceof HttpResponse) {
            observer.next(res);
          }
        });
    });
  }
}
