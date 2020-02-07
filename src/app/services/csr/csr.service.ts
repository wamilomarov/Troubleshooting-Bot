import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Csr} from '../../interfaces/csr';
import {SingleCsr} from '../../interfaces/single-csr';
import {CookieService} from 'ngx-cookie-service';
import {Observable, of, throwError} from 'rxjs';
import {catchError, retry} from 'rxjs/operators';
import {ApiResponse} from '../../interfaces/api-response';

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

  search = (query: string, page?: number, pageSize?: number): Observable<any> => {
    var url = this.uri + 'search?q=' + query + '&page=' + page + '&page_size=' + pageSize;
    return this.http.get<Csr>(url, this.httpOptions)
      .pipe((response) => {
          return response;
        },
        catchError(error => {
          return throwError(error);
        }));
  };

  create = (csr: Csr): Observable<any> => {
    return this.http.post(this.uri + 'tas', csr, this.httpOptions)
      .pipe((response) => {
        return response;
      }, catchError((error) => {
        return throwError(error);
      }));
  };

  get = (id: string): Promise<SingleCsr> => {
    return new Promise<SingleCsr>((resolve, reject) => {
      this.http.get(this.uri + 'tas/' + id)
        .toPromise()
        .then((response) => {
            resolve(response as SingleCsr);
          },
          (error) => {
            reject(error);
          });
    });
  };

  check = (csrId: string): Observable<ApiResponse> => {
    var url = this.uri + 'check_tas?csr_id=' + csrId;
    return this.http.get<ApiResponse>(url, this.httpOptions)
      .pipe(retry(3),
        catchError(this.handleError<ApiResponse>("checkCSR", {"data": null, "links": null, "meta": null})));
  };

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);

      return of(result as T);
    };
  }
}
