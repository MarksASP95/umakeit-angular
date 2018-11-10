import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';

import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { User } from '../models/user';

import { ToastrService } from 'ngx-toastr';

import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})


export class AuthService {

  currentUser;
  user: any;
  authState: any = null;

  constructor(private afAuth: AngularFireAuth,
              private afs: AngularFirestore,
              private router: Router,
              private userService: UserService,
              private toastr: ToastrService) { 

    this.afAuth.authState.subscribe(auth => {
      this.authState = auth;
    })

    this.user = this.afAuth.authState.pipe(switchMap(user => {
      if(user){
        return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
      }
      else{
        return of(null);
      }
    }));
  
  
  }

  get authenticated(): boolean{
    return this.authState !== null;
  }

  googleLogin(){
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.oAuthLogin(provider);
  }

  emailLogin(email, password){
    /* const provider = new firebase.auth.EmailAuthProvider();
    return this.oAuthLogin(provider); */
    let thisClass
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(() => {
      //this.updateUserData(res.user.email);
      this.router.navigate(['dashboard']);
      setTimeout(() => this.toastr.success('Bienvenido'), 500);
    })
    .catch(() => {
      this.toastr.error('Usuario y/o contraseña incorrectos');
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
      password: user.password,
      roles: user.roles
    }

    return userRef.set(data);

  }

  async signUp(email: string, password: string, username: string){

    await this.userService.usernameIsAvaiable(username)
      .then(() => {
        this.afAuth.auth.createUserWithEmailAndPassword(email, password)
        .then(user => {
          this.userService.addUser(email, user.user.uid, username)
            .then(() => {
              this.toastr.success('Usuario creado\nRedireccionando...','Éxito');
              setTimeout(() => this.router.navigate(['dashboard']), 2500);
            })
        })
        .catch(err => {
          switch(err.code){
            case 'auth/email-already-in-use':
              this.toastr.error('Esta dirección de correo ya está en uso', 'Email no disponible');
              break;
            case 'auth/invalid-email':
              this.toastr.error('Email no válido', 'Introduce una dirección de correo válida');
              break;
            case 'auth/weak-password':
              this.toastr.error('Contraseña débil', 'Tu contraseña debe tener al menos 6 caracteres');
          }
        });
      })
      .catch(() => {
        this.toastr.error('Elige otro nombre de usuario','Usuario ya existe');
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

  get currentUserObservable(): any {
    return this.afAuth.auth;
  }

}
