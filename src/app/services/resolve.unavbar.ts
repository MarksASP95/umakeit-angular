import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router, Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from './auth.service';
import * as _ from 'lodash';
import * as firebase from 'firebase/app';
import { take, map, tap } from 'rxjs/operators';

@Injectable()
export class ResolveUnavbar implements Resolve<any> {
  constructor(private auth: AuthService, private router: Router) {}

  resolve(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | boolean {

      let obj = {};
      return this.auth.user.pipe(
        take(1),
        map(user => {
          /* if(_.get(user, 'roles') === undefined){
            return false;
          } */
          if(user){
            obj['username'] = _.get(user, 'username');
            obj['isadmin'] = _.get(user, 'roles').admin;
            return obj;
          }
          obj['username'] = null;
          obj['isadmin'] = false;
          return obj;
        }));

  }
}