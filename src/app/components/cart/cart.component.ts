import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

// components
import { ComidainfoComponent } from '../comidainfo/comidainfo.component';

// models
import { Comida } from '../../models/comida';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  comidas;
  modalRef: BsModalRef;

  constructor(private modalService: BsModalService) { }

  ngOnInit() {
    this.comidas = JSON.parse(localStorage.getItem('cart'));
    console.log(this.comidas);

    $(document).on('click', '#menu .btn-danger', function(){
      $(this).parents('.card').fadeOut();
  })
  }

  outOfCart(comida){
    let obj = JSON.parse(localStorage.getItem('cart'));

    if(obj.length == 1){
      localStorage.setItem('cart','[]');
    }
    else{
      obj.splice(comida.index,1);
      for(let i = 0; i<obj.length; i++){
        obj[i].index = i;
      }
      localStorage.setItem('cart', JSON.stringify(obj));
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
