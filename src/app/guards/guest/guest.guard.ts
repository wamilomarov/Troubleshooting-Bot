import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {map, take} from 'rxjs/operators';
import {ProfileService} from '../../services/profile/profile.service';

@Injectable({
  providedIn: 'root'
})

export class GuestGuard implements CanActivate {

  constructor(
    private router: Router,
    private profileService: ProfileService) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
    return this.profileService.isLoggedIn.pipe(
      take(1),                              // {2}
      map((isLoggedIn: boolean) => {         // {3}
        if (!isLoggedIn) {
          this.router.navigate(['']);  // {4}
          return false;
        }
        return true;
      })
    );
  }

}
