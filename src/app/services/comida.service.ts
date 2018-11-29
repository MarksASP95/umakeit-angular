import { Injectable } from '@angular/core';
import { Observable, combineLatest, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

// firebase
import { AngularFirestore, AngularFirestoreCollection  } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';

// models
import { Comida } from '../models/comida';

// services
import { AuthService } from './auth.service';
import { ImgStorageService } from './img-storage.service';

@Injectable({
  providedIn: 'root'
})
export class ComidaService {

/*   comidasCollection;
  comidaDoc;
  comidas: Observable<Comida[]>; */
  searchText;
  comidaRefs = [];

  constructor(private db: AngularFirestore, private auth: AuthService, private imgStorageService: ImgStorageService) { 
  }



  getComidas(){
    return this.db.collection('comidas', ref => ref.where('avaiable','==',true)).snapshotChanges();
  }

  getAllComidas(){
    return this.db.collection('comidas').snapshotChanges();
  }

  getCartComidas(arrayUids){

    let comidaRefs = [];

    /* arrayUids.forEach(uid => {
      this.comidaRefs.push(this.db.doc('comidas/' + uid));
    }); */

    let amountArr = [];
    let modeArr = [];
    let uidArr = [];
    for(let i = 0; i < arrayUids.length; i++){
      comidaRefs.push(this.db.collection('comidas').doc(arrayUids[i].uid).valueChanges());
      amountArr.push(arrayUids[i].amount);
      modeArr.push(arrayUids[i].mode);
      uidArr.push(arrayUids[i].uid)
    }

    let OrQueryResult = combineLatest(...comidaRefs).pipe(
      switchMap(result => {
        let arr = [];
        for(let i = 0; i < result.length; i++){
          let obj = {
            result: result[i],
            amount: amountArr[i],
            mode: modeArr[i],
            uid: uidArr[i]
          };
          arr.push(obj);
        }
        return of(arr);
      })
    );

    return OrQueryResult;

    
  }

  getCartsComidas(arrayCart){
    console.log(arrayCart);
    let comidaRefs = [];

    let amountArr = [];
    let modeArr = [];
    let timeArr = [];
    let uidArr = [];

    for(let i = 0; i < arrayCart.length - 1; i++){
      comidaRefs.push(this.db.collection('comidas').doc(arrayCart[i].uid).valueChanges());
      amountArr.push(arrayCart[i].amount);
      modeArr.push(arrayCart[i].mode);
      uidArr.push(arrayCart[i].uid);
    }

    for(let i = 0; i < arrayCart.length; i++){
      timeArr.push(arrayCart[arrayCart.length - 1]);
    }

    //console.log(timeArr);

    let OrQueryResult = combineLatest(...comidaRefs).pipe(
      switchMap(result => {
        let arr = [];
        let cart = {};
        for(let i = 0; i < result.length; i++){
          let obj = {
            result: result[i],
            uid: uidArr[i],
            amount: amountArr[i],
            mode: modeArr[i]
          };
          cart = {
            order: obj,
            time: arrayCart[arrayCart.length - 1]
          }
          arr.push(cart);
        }
        return of(arr);
      })
    );

    return OrQueryResult;

  }

  searchComidas(){
    if(this.searchText !== undefined){
      return this.db.collection('comidas', ref => ref.orderBy('name').startAt(this.searchText).endAt(this.searchText+'\uf8ff')).snapshotChanges();
    }
    return null;
  }

  changeSearchText(searchText: string){
    this.searchText = searchText;
  }

  addComida(comida: Comida){
    return this.db.collection('comidas').add({
      name: comida.name,
      desc: comida.desc,
      price: comida.price,
      img: comida.img,
      modificable: comida.modificable,
      avaiable: true
    });
  }

  updateComida(comida: Comida){
    return this.db.collection('comidas').doc(comida.$id).update({
      name: comida.name,
      desc: comida.desc,
      price: comida.price,
      modificable: comida.modificable,
    })
  }

  toggleAvaiable(id: string, avaiable: boolean){
    return this.db.collection('comidas').doc(id).update({
      avaiable: !avaiable
    });
  }
  
  getComidaName(uid: string){
    return this.db.collection('comidas').doc(uid).get();
  }


  addPedido(dataPedido){
    return this.db.collection('pedidos').add({
      foods: dataPedido.foods,
      address: dataPedido.address,
      time: dataPedido.time
    });
  }

  getPedidos(){
    return this.db.collection('pedidos').snapshotChanges();
  }

}
