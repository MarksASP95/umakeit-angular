import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import * as _ from 'lodash';
import { take, map, tap } from 'rxjs/operators';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | boolean {

      return this.auth.user.pipe(
        take(1),
        map(user => {
          if(_.get(user, 'roles') === undefined){
            return false;
          }
          return _.get(user, 'roles').admin;
        }),
        tap(authorized => {
          if (!authorized) {
            this.router.navigate(['/']);
          }
        }));
  }
}