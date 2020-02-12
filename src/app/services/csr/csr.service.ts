import {Injectable} from '@angular/core';
import {HttpClient, HttpEvent, HttpHeaders} from '@angular/common/http';
import {Csr} from '../../interfaces/csr';
import {SingleCsr} from '../../interfaces/single-csr';
import {CookieService} from 'ngx-cookie-service';
import {Observable, of, throwError} from 'rxjs';
import {catchError, retry} from 'rxjs/operators';
import {NewCsr} from "../../components/create-form/create-form.component";

@Injectable({
  providedIn: 'root'
})
export class CsrService {
  private uri = 'http://localhost:8000/api/';
  private httpOptions;

  constructor(private http: HttpClient, private cookieService: CookieService) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + cookieService.get('user.api_token')
      })
    };
  }

  search = (query: string, page?: number, pageSize?: number): Observable<HttpEvent<Csr>> => {
    var url = this.uri + 'search?q=' + query + '&page=' + page + '&page_size=' + pageSize;
    return this.http.get<Csr>(url, this.httpOptions)
      .pipe(retry(3),
        catchError(error => {
          return throwError(error);
        }));
  };

  create = (csr: NewCsr): Observable<any> => {
    return this.http.post(this.uri + 'tas', csr, this.httpOptions)
      .pipe((response) => {
        return response;
      }, catchError((error) => {
        return throwError(error);
      }));
  };

  get = (id: string): Observable<HttpEvent<SingleCsr>> => {

      return this.http.get<SingleCsr>(this.uri + 'tas/' + id, this.httpOptions)
        .pipe(retry(3),
          catchError((err, caught) => {return caught}));

  };

  check = (csrId: string): Observable<HttpEvent<Csr>> => {
    var url = this.uri + 'check?csr_id=' + csrId;
    return this.http.get<Csr>(url, this.httpOptions)
      .pipe(retry(3), catchError((err, caught) => {return caught}));
  };

  private handleError<T>(operation = 'operation', result?) {
    return (error: any): Observable<T> => {
      console.error(error);

      return of(result as T);
    };
  }
}
