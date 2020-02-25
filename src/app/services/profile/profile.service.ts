import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Profile} from '../../interfaces/profile';
import {BehaviorSubject, Observable, pipe, throwError} from 'rxjs';
import {catchError, map, take} from 'rxjs/operators';
import {LoginForm} from '../../interfaces/login-form';
import {CookieService} from 'ngx-cookie-service';
import {RegisterForm} from '../../interfaces/register-form';
import {ProfileUpdateForm} from '../../interfaces/profile-update-form';
import {IHttpResponse} from '../../interfaces/http-response';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private uri = 'http://localhost:8000/api/';
  private loggedIn: BehaviorSubject<boolean>;
  private httpOptions;

  get isLoggedIn() {
    return this.loggedIn.asObservable(); // {2}
  }

  constructor(private http: HttpClient, private cookieService: CookieService) {

    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Accept': 'application/json'
      })
    };

    this.loggedIn = new BehaviorSubject<boolean>(cookieService.check('user.api_token'));

    if (cookieService.check('user._id') && cookieService.check('user.api_token'))
    {
      this.httpOptions.headers = this.httpOptions.headers
        .set('Authorization', ("Bearer " + cookieService.get('user.api_token')));
      this.loggedIn.next(true);
    }
    else
    {
      this.httpOptions.headers.delete('Authorization');
      this.loggedIn.next(false);
    }

    this.loggedIn.pipe(
      take(1),
      map((isLoggedIn: boolean) => {
        if (isLoggedIn) {
          this.httpOptions.headers.set("Authorization", 'Bearer ' + cookieService.get('user.api_token'));
          return true;
        }
        return false;
      })
    );

  }

  register = (registerForm: RegisterForm) => {
    return this.http.post(this.uri + 'register', registerForm);
  };

  login = (credentials: LoginForm): Observable<IHttpResponse<Profile>> => {

      return this.http.post<IHttpResponse<Profile>>(this.uri + 'login', credentials)
        .pipe(map((response:IHttpResponse<Profile>) => {
            this.cookieService.set('user._id', response.data._id);
            this.cookieService.set('user.name', response.data.name);
            this.cookieService.set('user.username', response.data.username);
            this.cookieService.set('user.email', response.data.email);
            this.cookieService.set('user.api_token', response.data.api_token);
          this.loggedIn.next(true);
          return response;
        }),
          catchError(this.errorHandler));

  };

  errorHandler = (error: HttpErrorResponse) => {
    return throwError(error || "Server Error");
  };

  logout = () => {
    this.httpOptions.headers = this.httpOptions.headers
      .set('Authorization', ("Bearer " + this.cookieService.get('user.api_token')));
    return this.http.post<any>(this.uri + 'logout', {}, {
      headers: this.httpOptions.headers
    })
      .pipe(map((response) => {
          this.clearAuthCookies();
          console.log("Logged out ok");
          return response;
        }),
        catchError((err => {
          this.clearAuthCookies();
          console.log("Logged out fail");
          return throwError(err || "Server Error");
        })));
  };

  clearAuthCookies = () => {
    this.cookieService.delete('user._id');
    this.cookieService.delete('user.name');
    this.cookieService.delete('user.username');
    this.cookieService.delete('user.email');
    this.cookieService.delete('user.api_token');
    this.loggedIn.next(false);
  };

  update = (profileUpdateForm: ProfileUpdateForm)  => {
    return this.http.post(this.uri + 'update', profileUpdateForm, {
      headers: this.httpOptions.headers
    })
      .pipe(map((response: any) => {
          this.cookieService.set('user._id', response.data._id);
          this.cookieService.set('user.name', response.data.name);
          this.cookieService.set('user.username', response.data.username);
          this.cookieService.set('user.email', response.data.email);
          this.cookieService.set('user.api_token', response.data.api_token);
          return response;
        }),
        catchError(this.errorHandler))
  }
}
