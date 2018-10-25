import { Component, OnInit } from '@angular/core';
import { ComidaService } from '../../services/comida.service';
import { Comida } from 'src/app/models/comida';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(public comidaService: ComidaService) { }

  comidas = [];

  ngOnInit() {
    this.getComidas();
  }

  getComidas() {
    if(this.comidaService.searchComidas() !== null){
      this.comidaService.searchComidas().subscribe(comidas => {
        this.comidas = comidas.map(snap => {
          let obj = {
            id: snap.payload.doc.id,
            ...snap.payload.doc.data()
          }
          console.log(obj);
          return obj;
          
        })
      });
      console.log("Comidas: ", this.comidas);
    }

  }



  

}
