import {
  HTTP_INTERCEPTORS, HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {empty, Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {MatSnackBar} from "@angular/material/snack-bar";
import {ProfileService} from '../profile/profile.service';


@Injectable()
export class HttpErrorInterceptorService  implements HttpInterceptor  {

  constructor(
    private router: Router,
    private snackBar: MatSnackBar,
    private profileService: ProfileService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req)
    .pipe<HttpEvent<any>>(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = '';
        if (error instanceof HttpErrorResponse) {
          if (error.status == 404)
          {
            this.router.navigate(['/not-found']);
          }
          else if (error.status == 0)
          {
            this.router.navigate(['/down']);
          }
          else if (error.status == 401)
          {
            this.profileService.clearAuthCookies();
            this.router.navigate(["login"]);
          }
          else if (error.status == 422)
          {
            var errorMessages = "";
            for (var message in error.error.errors) {
              errorMessages +=  error.error.errors[message] + "\n\n";
            }
            this.snackBar.open(errorMessages);
            throwError(error || "Server Error");
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
