import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

// firebase
import { AngularFirestore, AngularFirestoreCollection  } from '@angular/fire/firestore';

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

  constructor(private db: AngularFirestore, private auth: AuthService, private imgStorageService: ImgStorageService) { 
  }



  getComidas(){
    return this.db.collection('comidas', ref => ref.where('avaiable','==',true)).snapshotChanges();
  }

  getAllComidas(){
    return this.db.collection('comidas').snapshotChanges();
  }
/*   getComidasSearch(comidaSearch: string){
     this.comidas = this.db.collection('comidas').snapshotChanges().pipe(map(changes=> {
      return changes.map(action => {
          const data = action.payload.doc.data() as Comida;
          return data;
      });
    }));
    return this.comidas.pipe(map(arr => arr.filter( r => r.name. >= comidaSearch ))) 
  //  this.comidas = this.db.collection('comidas', ref => ref.where("name", ">=", comidaSearch));
  } */

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
    return this.db.collection('comidas').doc(comida.$id).set({
      name: comida.name,
      desc: comida.desc,
      price: comida.price,
      modificable: comida.modificable,
      img: comida.img
    })
  }

  deleteComida($id: string){

  }

}
