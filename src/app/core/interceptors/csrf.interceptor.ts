// csrf.interceptor.ts
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class CsrfInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const csrftoken = this.getCookie('csrftoken');

    // clona a request adicionando header e withCredentials
    const cloned = req.clone({
      headers: csrftoken ? req.headers.set('X-CSRFToken', csrftoken) : req.headers,
      withCredentials: true
    });
    return next.handle(cloned);
  }

  private getCookie(name: string): string | null {
    const match = document.cookie.match(new RegExp('(^|; )' + name + '=([^;]*)'));
    return match ? decodeURIComponent(match[2]) : null;
  }
}
