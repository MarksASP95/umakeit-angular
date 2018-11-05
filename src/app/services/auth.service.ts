import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';

import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { User } from '../models/user';

import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  currentUser;
  user: Observable<User>;

  constructor(private afAuth: AngularFireAuth,
              private afs: AngularFirestore,
              private router: Router,
              private userService: UserService) { 

    this.user = this.afAuth.authState.pipe(switchMap(user => {
      if(user){
        return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
      }
      else{
        return of(null);
      }
    }));
  
  
  }

  googleLogin(){
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.oAuthLogin(provider);
  }

  emailLogin(email, password){
    /* const provider = new firebase.auth.EmailAuthProvider();
    return this.oAuthLogin(provider); */

    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(res => {
      //this.updateUserData(res.user.email);
      this.router.navigate(['/dashboard']);
    })
    .catch(function(error) {
      console.log(error);
    });
  }

  private oAuthLogin(provider){
    console.log(1);
    return this.afAuth.auth.signInWithPopup(provider)
      .then(credential => {
        console.log(2);
        this.updateUserData(credential.user);
      })
  }

  private updateUserData(user){
    
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`${user.uid}`);

    const data: User = {
      uid: user.uid,
      email: user.email,
      username: user.username,
      password: user.password
    }

    return userRef.set(data);

  }

  public signUp(email: string, password: string, username: string){
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((user) => {
        this.userService.addUser(email, user.user.uid, username);
        alert("Usuario creado exitosamente");
        
      })
      .catch(err => {
        alert(err);
      });
  }

  public emailAndPassword(email, password){
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then(res => {
        console.log("Logged in");
        this.router.navigate(['/dashboard']);
      })
      .catch(err => {
        console.log(err);
      });
  }

  public signOut() {
    this.afAuth.auth.signOut().then( () => {
      this.router.navigate(['/dashboard'])
    });
  }

}
