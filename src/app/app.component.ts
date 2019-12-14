import { Component, OnInit } from '@angular/core';
import { GitSearchService} from './services/git-search/git-search.service';
import {ConnectionService} from 'ng-connection-service';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  status = 'Online';
  isOnline = true;
  // tslint:disable-next-line:no-shadowed-variable
  constructor(private GitSearchService: GitSearchService, private connectionService: ConnectionService, private _snackBar: MatSnackBar) {
    this.connectionService.monitor().subscribe(isConnected => {
      this.isOnline = isConnected;
      if (this.isOnline) {
        this.status = "Online";
      }
      else {
        this.status = "Offline";
      }
      this._snackBar.open("You are " + this.status, "Close");
    })
  }
  title = 'Shamil\'s first Angular';
  ngOnInit(): void { }
}
