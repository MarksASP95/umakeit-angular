import { Component, OnInit } from '@angular/core';

// components
import { ComidainfoComponent } from '../comidainfo/comidainfo.component';

// modal
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

// services
import { ComidaService } from '../../services/comida.service';
import { ImgStorageService } from '../../services/img-storage.service';

// models
import { Comida } from 'src/app/models/comida';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  comidas = [];
  modalRef: BsModalRef;

  constructor(private comidaService: ComidaService, 
              private modalService: BsModalService,
              private imgStorageService: ImgStorageService) { }

  ngOnInit() {
    this.comidaService.getComidas().subscribe(comidas => {
      this.comidas = comidas.map(snap => {
        let obj = {
          id: snap.payload.doc.id,
          ...snap.payload.doc.data()
        }
        return obj;
      });
    });
  }

  openModal(comida: Comida){
    this.modalRef = this.modalService.show(ComidainfoComponent,{
      initialState:{
        title: comida.name,
        img: comida.img,
        bodyText: comida.desc,
        price: comida.price,
        modificable: comida.modificable
      }
    });
  }

  getImage(comida){
    return this.imgStorageService.getURL(comida.img).subscribe(value => {
      return value
    });
  }

}