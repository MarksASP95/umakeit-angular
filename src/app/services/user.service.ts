import { Injectable } from '@angular/core';

// firebase
import { AngularFirestore, AngularFirestoreCollection  } from '@angular/fire/firestore';

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

  usernameIsAvaiable(newUsername){
    var thisClass = this;
    return new Promise(function(resolve, reject){
      thisClass.getUser(newUsername).subscribe(snapshot => {
        if(snapshot.length == 0 ){
          resolve();
        }
        else{
          reject(Error('Usuario ya existe'));
        }
      });
    });
  }

  addUser(newEmail, uid, newUsername){

    return this.db.collection("users").doc(uid).set({
      email: newEmail,
      username: newUsername,
      roles: {
        client: true,
        admin: false
      }
    });

  }
}

