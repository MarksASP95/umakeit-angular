import { Injectable } from '@angular/core';

// firebase
import { AngularFirestore, AngularFirestoreCollection  } from '@angular/fire/firestore';

import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  usersCollection: AngularFirestoreCollection;

  ngInit(){
    this.usersCollection = this.db.collection('users');
  }


  constructor(public db: AngularFirestore, public router: Router, private toastr: ToastrService) { }

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

  addUser(newEmail, uid, newUsername, isadmin){

    return this.db.collection("users").doc(uid).set({
      email: newEmail,
      username: newUsername,
      roles: {
        client: true,
        admin: isadmin
      }
    });

  }

  storeCart(username: string){
    let boughtCart = JSON.parse(localStorage.checkoutcart);
    boughtCart.push(new Date());

    this.db.collection("carts").add({
      cart: boughtCart,
      username: username
    }).then(res => {
      this.toastr.success('La compra ha sido guardada en tu historial', 'Compra registrada')
    }).catch(err => {
      alert('La compra se realizó, pero no pudo ser registrada en tu historial');
    })
  }

  getCarts(username: string){
    return this.db.collection("carts", ref => ref.where('username','==',username)).snapshotChanges();
  }
}

