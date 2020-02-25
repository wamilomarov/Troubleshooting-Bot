import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders, HTTP_INTERCEPTORS
} from '@angular/common/http';

import { Observable } from 'rxjs';
import {CookieService} from 'ngx-cookie-service';

/** Inject With Credentials into the request */
@Injectable()
export class AuthTokenInterceptor implements HttpInterceptor {

  private httpOptions;

  constructor(private cookieService: CookieService)
  {}

  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {

    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + this.cookieService.get('user.api_token')
      })
    };

    req = req.clone({
      headers: this.httpOptions.headers
    });

    return next.handle(req);
  }
}

export const AuthTokenInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: AuthTokenInterceptor,
  multi: true,
};
