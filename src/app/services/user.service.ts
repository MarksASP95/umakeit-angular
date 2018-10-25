import { Injectable } from '@angular/core';

// firebase
import { AngularFirestore, AngularFirestoreCollection  } from '@angular/fire/firestore';
import { User } from '../models/user';

import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  usersCollection: AngularFirestoreCollection;

  ngInit(){
    this.usersCollection = this.db.collection('users');
  }


  constructor(public db: AngularFirestore, public router: Router) { }

  getUser(username: string){
    return this.db.collection('users', ref => ref.where('username','==',username)).snapshotChanges();
  }

  addUser(newEmail, uid, newUsername){
    this.db.collection("users").doc(uid).set({
      email: newEmail,
      username: newUsername
    });
    this.router.navigate(['/dashboard']);
  }
}

