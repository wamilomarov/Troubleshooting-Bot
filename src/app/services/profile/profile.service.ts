import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Profile} from '../../interfaces/profile';
import {BehaviorSubject, Observable, pipe, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {LoginForm} from '../../interfaces/login-form';
import {CookieService} from 'ngx-cookie-service';
import {RegisterForm} from '../../interfaces/register-form';
import {ProfileUpdateForm} from '../../interfaces/profile-update-form';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private uri = 'http://localhost:8000/api/';
  private loggedIn = new BehaviorSubject<boolean>(false);
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
    if (cookieService.check('user._id') && cookieService.check('user.api_token'))
    {
      this.httpOptions.headers = this.httpOptions.headers
        .append('Authorization', ("Bearer " + cookieService.get('user.api_token')));
      this.loggedIn.next(true);
    }
    else
    {
      this.httpOptions.headers.delete('Authorization');
      this.loggedIn.next(false);
    }


  }

  register = (registerForm: RegisterForm) => {
    return this.http.post(this.uri + 'register', registerForm);
  };

  login = (credentials: LoginForm): Observable<Profile> => {

      return this.http.post<Profile>(this.uri + 'login', credentials)
        .pipe(map((response:Profile) => {
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
    return this.http.post<any>(this.uri + 'logout', {}, this.httpOptions)
      .pipe(map((response) => {
          this.cookieService.delete('user._id');
          this.cookieService.delete('user.name');
          this.cookieService.delete('user.username');
          this.cookieService.delete('user.email');
          this.cookieService.delete('user.api_token');
          this.loggedIn.next(false);
          return response;
        }),
        catchError((err => {
          this.cookieService.delete('user._id');
          this.cookieService.delete('user.name');
          this.cookieService.delete('user.username');
          this.cookieService.delete('user.email');
          this.cookieService.delete('user.api_token');
          this.loggedIn.next(false);
          return throwError(err || "Server Error");
        })));
  };

  update = (profileUpdateForm: ProfileUpdateForm)  => {
    return this.http.post(this.uri + 'update', profileUpdateForm, this.httpOptions)
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
