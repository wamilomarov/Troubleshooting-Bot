import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Csr} from '../../interfaces/csr';
import {SingleCsr} from '../../interfaces/single-csr';

@Injectable({
  providedIn: 'root'
})
export class CsrService {
  private uri = 'http://localhost:5000/';

  constructor(private http: HttpClient) {
  }

  search = (query: string): Promise<Csr> => {
    return new Promise<Csr>((resolve, reject) => {
      this.http.get(this.uri + 'tas?q=' + query)
        .toPromise()
        .then((response) => {
            resolve(response as Csr);
          },
          (error) => {
            reject(error);
          });
    });
  };

  create = (csr: Csr): Promise<unknown> => {
    return new Promise<unknown>((resolve, reject) => {
      this.http.post(this.uri + 'tas', csr)
        .toPromise()
        .then((response) => {
          resolve(response);
        }, (error) => {
          reject(error);
        });
    });
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
}
