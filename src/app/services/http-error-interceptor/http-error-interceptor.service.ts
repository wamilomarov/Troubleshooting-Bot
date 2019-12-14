import {
  HTTP_INTERCEPTORS, HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor,
  HttpRequest, HttpResponse
} from '@angular/common/http';
import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {empty, Observable, throwError} from 'rxjs';
import {catchError, retry} from 'rxjs/operators';


@Injectable()
export class HttpErrorInterceptorService  implements HttpInterceptor  {

  constructor(private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req)
    .pipe<HttpEvent<any>>(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = '';
        if (error instanceof HttpErrorResponse) {
          if (error.status == 404)
          {
            this.router.navigateByUrl('/not-found', {replaceUrl: true});
          }
          else if (error.status == 0)
          {
            this.router.navigateByUrl('/down', {replaceUrl: true});
          }
          return empty();
          // return new EmptyObservable;
        } else {
          console.log(error);
        }
        return throwError(errorMessage);
      })
    );
  }
}

export const HttpErrorInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: HttpErrorInterceptorService,
  multi: true,
};
