import { Injectable } from "@angular/core";
import {HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {LoadingService} from './loading.service';
@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  private requests: HttpRequest<any>[] = [];

  constructor(private loadingService: LoadingService) {
  }

  removeRequest(req: HttpRequest<any>) {
    const i = this.requests.indexOf(req);
    this.requests.splice(i, 1);
    this.loadingService.isLoading.next(this.requests.length > 0);
  }


  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.requests.push(request);
    this.loadingService.isLoading.next(true);

    return Observable.create(observer => {
      const subscription = next.handle(request)
        .subscribe(
          event => {
            if (event instanceof HttpResponse) {
              this.removeRequest(request);
              observer.next(event);
            }
          },
          err => { this.removeRequest(request); observer.error(err); },
          () => { this.removeRequest(request); observer.complete(); });
      // teardown logic in case of cancelled requests
      return () => {
        this.removeRequest(request);
        subscription.unsubscribe();
      };
    });

  }
}
