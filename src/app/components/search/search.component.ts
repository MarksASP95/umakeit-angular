import { Component, OnInit } from '@angular/core';

// services
import { ComidaService } from '../../services/comida.service';

// components
import { ComidainfoComponent } from '../comidainfo/comidainfo.component';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';

// models
import { Comida } from '../../models/comida';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  modalRef: BsModalRef;

  constructor(private comidaService: ComidaService, private modalService: BsModalService) { }

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

  openModal(comida: Comida){
    this.modalRef = this.modalService.show(ComidainfoComponent,{
      initialState:{
        title: comida.name,
        img: comida.img,
        bodyText: comida.desc,
        price: comida.price
      }
    });
  }




  

}
