import {AfterViewInit, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ConnectionService} from 'ng-connection-service';
import {MatSnackBar} from '@angular/material';
import {LoadingService} from './services/loading/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
  status = 'Online';
  isOnline = true;
  isLoading = false;

  // tslint:disable-next-line:no-shadowed-variable
  constructor(
    private connectionService: ConnectionService,
    private _snackBar: MatSnackBar,
    private loadingService: LoadingService,
    private cdr: ChangeDetectorRef,
  ) {
    this.connectionService.monitor().subscribe(isConnected => {
      this.isOnline = isConnected;
      if (this.isOnline) {
        this.status = "Online";
      } else {
        this.status = "Offline";
      }
      this._snackBar.open("You are " + this.status, "Close");
    });

  }

  ngAfterViewInit(){
    this.loadingService.isLoading.subscribe(loadingValue => {
      this.isLoading = loadingValue;
      this.cdr.detectChanges();
    })
  }

  title = 'Ericsson Troubleshooting Bot';

  ngOnInit(): void {
  }
}
