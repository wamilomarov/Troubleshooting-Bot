import { Component, OnInit, OnDestroy } from '@angular/core';
import {Csr} from '../../interfaces/csr';
import {CsrService} from '../../services/csr/csr.service';

@Component({
  selector: 'app-csr-list',
  templateUrl: './csr-list.component.html',
  styleUrls: ['./csr-list.component.css']
})
export class CsrListComponent implements OnInit {
  searchResults: Csr;
  searchQuery: string;
  showSpinner = false;

  constructor(private csrService: CsrService) { }

  ngOnInit() {
    this.csrService.search('')
      .then((response) => {
        this.searchResults = response;
        // tslint:disable-next-line:no-shadowed-variable
      }, (error) => {
        alert('Error: ' + error.statusText);
      });
  }

  ngOnDestroy(): void {
  }

  search = () => {
    this.showSpinner = true;
    this.csrService.search(this.searchQuery)
      .then((response) => {
        this.showSpinner = false;
        this.searchResults = response;
        // tslint:disable-next-line:no-shadowed-variable
      }, (error) => {
        this.showSpinner = false;
        alert('Error: ' + error.statusText);
      });
  }
}
