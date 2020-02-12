import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import {Observable} from 'rxjs';
import {ProfileService} from '../../services/profile/profile.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnDestroy, OnInit {
  mobileQuery: MediaQueryList;
  opened: boolean;
  // tslint:disable-next-line:variable-name
  private _mobileQueryListener: () => void;
  isLoggedIn$: Observable<boolean>;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private media: MediaMatcher,
    private profileService: ProfileService,
    private router: Router) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);

  }

  ngOnInit(){
    this.mobileQuery ? this.opened = false : true;
    this.isLoggedIn$ = this.profileService.isLoggedIn;
  }

  ngOnDestroy() {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  };

  logout = () => {
    this.profileService.logout()
      .toPromise()
      .finally(() => {
        this.router.navigate(['login']);
      });
  };

  toggle = () => {
    this.opened = !this.opened;
  };
}
