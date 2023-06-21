import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable, } from 'rxjs';
import { HandlerResponseService } from '../service/handler-response.service';
import { StatusCode } from '../enum/status-code.enum';

@Injectable()
export class CommonInterceptor implements HttpInterceptor {

  constructor(
    private handlerResponseService: HandlerResponseService
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log(next);
    
    return next.handle(request).pipe(
      tap(event => {
        if (event instanceof HttpResponse && event.body.statusCode !== StatusCode.SUCCESS) {
          this.handlerResponseService.failedResponse(event.body)
        }
      })
    );
  }
}
