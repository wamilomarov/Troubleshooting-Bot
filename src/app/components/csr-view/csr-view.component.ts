import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {CsrService} from '../../services/csr/csr.service';
import {SingleCsr} from '../../interfaces/single-csr';
import {HttpEvent} from '@angular/common/http';
import {IHttpResponse} from '../../interfaces/http-response';

@Component({
  selector: 'app-csr-view',
  templateUrl: './csr-view.component.html',
  styleUrls: ['./csr-view.component.css']
})
export class CsrViewComponent implements OnInit {

  csrId;
  csr: IHttpResponse<SingleCsr>;
  notFound = false;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private csrService: CsrService) {
  }

  ngOnInit() {
    this.csrId = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        return params.get('id');
      })
    );
    this.csrId = this.route.snapshot.paramMap.get('id');

    this.csrService.get(this.csrId)
      .subscribe(
        data => {this.csr = data}
      );
    // this.csrService.get(this.csrId)
    //   .then((response) => {
    //     this.csr = response;
    //   }).catch(error => {
    //     if (error.status == 404)
    //     {
    //       this.notFound = true;
    //     }
    // })
  }

}
