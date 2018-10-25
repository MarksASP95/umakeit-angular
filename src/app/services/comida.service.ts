import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// firebase
import { AngularFirestore, AngularFirestoreCollection  } from '@angular/fire/firestore';

// models
import { Comida } from '../models/comida';

@Injectable({
  providedIn: 'root'
})
export class ComidaService {

  comidasCollection;
  comidaDoc;
  comidas: Observable<Comida[]>;
  searchText;

  constructor(public db: AngularFirestore) { 
  }



  getComidas(){
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

  insertComida(comida: Comida){

  }

  updateComida(comida: Comida){

  }

  deleteComida($id: string){

  }

}
