import {Injectable} from '@angular/core';
import {HttpClient, HttpEvent, HttpHeaders} from '@angular/common/http';
import {Csr} from '../../interfaces/csr';
import {SingleCsr} from '../../interfaces/single-csr';
import {CookieService} from 'ngx-cookie-service';
import {Observable, of, throwError} from 'rxjs';
import {catchError, map, retry, take} from 'rxjs/operators';
import {NewCsr} from "../../components/create-form/create-form.component";
import {ProfileService} from '../profile/profile.service';
import {IHttpResponse} from '../../interfaces/http-response';

@Injectable({
  providedIn: 'root'
})
export class CsrService {
  private uri = 'http://localhost:8000/api/';

  constructor(
    private http: HttpClient) {
  }


  search = (query: string, page?: number, pageSize?: number): Observable<Csr> => {
    var url = this.uri + 'search?q=' + query + '&page=' + page + '&page_size=' + pageSize;
    return this.http.get<Csr>(url)
      .pipe(retry(3),
        catchError(error => {
          return throwError(error);
        }));
  };

  create = (csr: NewCsr): Observable<any> => {
    return this.http.post(this.uri + 'tas', csr)
      .pipe((response) => {
        return response;
      }, catchError((error) => {
        return throwError(error);
      }));
  };

  get = (id: string): Observable<IHttpResponse<SingleCsr>> => {
      return this.http.get<IHttpResponse<SingleCsr>>(this.uri + 'csr/' + id)
        .pipe(retry(3),
          catchError((err, caught) => {return caught}));

  };

  check = (csrId: string): Observable<Csr> => {
    var url = this.uri + 'check?csr_id=' + csrId;
    return this.http.get<Csr>(url)
      .pipe(retry(3), catchError((err, caught) => {return caught}));
  };

  private handleError<T>(operation = 'operation', result?) {
    return (error: any): Observable<T> => {
      console.error(error);

      return of(result as T);
    };
  }
}
