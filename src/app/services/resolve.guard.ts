import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from './auth.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { switchMap, take, map, tap } from 'rxjs/operators';
import { AngularFirestore } from 'angularfire2/firestore';
import { User } from '../models/user';
import * as _ from 'lodash';
import * as firebase from 'firebase/app';

@Injectable()
export class ResolveGuard implements Resolve<any> {
  constructor(private auth: AuthService, private afAuth: AngularFireAuth, private afs: AngularFirestore) {}
 any
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any>|Promise<any>|any {
    //firebase.auth().currentUser;
    return this.afAuth.authState.pipe(switchMap(user => {
        if(user){
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        }
      }));
  }
}