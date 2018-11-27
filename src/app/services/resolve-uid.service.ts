import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router, Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from './auth.service';
import * as _ from 'lodash';
import * as firebase from 'firebase/app';
import { take, map, tap } from 'rxjs/operators';

@Injectable()
export class ResolveUidService implements Resolve<any> {
  constructor(private auth: AuthService, private router: Router) {}

  resolve(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | boolean {

      return this.auth.user.pipe(
        take(1),
        map(user => {
          if(user){
            return of(this.auth);
          }
        }));
  }
}