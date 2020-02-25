import { Component, OnInit } from '@angular/core';
import {Csr} from '../../interfaces/csr';
import {CsrService} from '../../services/csr/csr.service';
import {MatSnackBar} from '@angular/material';
import {PageEvent} from '@angular/material/typings/paginator';
import {HttpEvent} from "@angular/common/http";

@Component({
  selector: 'app-csr-list',
  templateUrl: './csr-list.component.html',
  styleUrls: ['./csr-list.component.css']
})
export class CsrListComponent implements OnInit {
  searchResults: Csr;
  searchQuery: string;
  pageEvent : PageEvent;

  constructor(private csrService: CsrService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.csrService.search('', 0, 15)
      .subscribe((response) => {
        this.searchResults = response;
        // tslint:disable-next-line:no-shadowed-variable
      }, (error) => {
        this.snackBar.open(error.statusText, "Ok", {duration: 4000});
      });
  }

  ngOnDestroy(): void {
  }

  search = (event? : PageEvent) => {
    var pageIndex = 0;
    var pageSize = 15;

    if (this.searchQuery === undefined)
    {
      this.searchQuery = "";
    }

    if (event != undefined)
    {
      pageIndex = event.pageIndex;
      pageSize = event.pageSize;
    }
    this.csrService.search(this.searchQuery, pageIndex, pageSize)
      .subscribe((response) => {
        this.searchResults = response;
        // tslint:disable-next-line:no-shadowed-variable
      }, (error) => {
        this.snackBar.open(error.statusText, "Ok", {duration: 4000});
      });

    return event;
  }
}
