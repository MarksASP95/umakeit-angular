import { Injectable } from '@angular/core';

// firebase
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

// models
import { Comida } from '../models/comida';

@Injectable({
  providedIn: 'root'
})
export class ComidaService {

  comidaList: AngularFireList<any>;
  selectedComida: Comida = new Comida();

  constructor(private firebase: AngularFireDatabase) { }

  getComidas(){
    return this.comidaList = this.firebase.list('comidas');
  }

  insertComida(comida: Comida){
    this.comidaList.push({
      name: comida.name,
      desc: comida.desc
    });
  }

  updateComida(comida: Comida){
    this.comidaList.update(comida.$id, {
      name: comida.name,
      desc: comida.desc
    });
  }

  deleteComida($id: string){
    this.comidaList.remove($id);
  }

}
