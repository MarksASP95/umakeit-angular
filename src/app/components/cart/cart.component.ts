import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

// components
import { ComidainfoComponent } from '../comidainfo/comidainfo.component';

// models
import { Comida } from '../../models/comida';
import { ActivationEnd, ActivatedRoute, Router } from '@angular/router';

// services
import { ComidaService } from 'src/app/services/comida.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  comidas;
  modalRef: BsModalRef;
  showcomidas: any;
  cart;

  constructor(private modalService: BsModalService, private router: Router, private route: ActivatedRoute, private comidaService: ComidaService) { }

  ngOnInit() {

    if(this.route.snapshot.data.userInfo.username == null){
      localStorage.setItem('next','checkout');
    }

    this.comidas = JSON.parse(localStorage.getItem('cart'));

    let arrayUids = this.getComidasArray(this.comidas);

    let queryResult = this.comidaService.getCartComidas(arrayUids);

    queryResult.subscribe(comidas => {
      this.comidas = comidas.map(snap => {
        let obj = {
          name: snap.result.name,
          desc: snap.result.desc,
          price: snap.result.price,
          img: snap.result.img,
          uid: snap.uid,
          amount: snap.amount,
          mode: snap.mode
        }
        return obj;
      });
    });
    /* for(let i = 0; i < realCart.length; i++){
      realCart[i]
    } */

    $(document).on('click', '#menu .btn-danger', function(){
      $(this).parents('.card').fadeOut();
  })

    //console.log(this.comidas);
  }

  getComidasArray(cartObject){
    let array = [];
    cartObject.forEach(product => {
      let obj = {
        uid: product['uid'],
        amount: product['amount'],
        mode: product['mode']
      }
      array.push(obj);
    });
    //console.log(array);
    return array;
  }

  outOfCart(uid){
    let obj = JSON.parse(localStorage.getItem('cart'));

    for(let i = 0; i < obj.length; i++){
      if(obj[i].uid == uid){
        var target = i;
        break;
      }
    }

    if(obj.length == 1){
      localStorage.setItem('cart','[]');
    }
    else{
      obj.splice(target,1);
      localStorage.setItem('cart', JSON.stringify(obj));
    }

    
    console.log(obj);
    
  }

  openModal(comida){
    this.modalRef = this.modalService.show(ComidainfoComponent,{
      initialState:{
        title: comida.name,
        img: comida.img,
        bodyText: comida.desc,
        price: comida.price,
        size: comida.mode
      }
    });
  }

  getLocalStorage(){
    return localStorage.cart;
  }

  goToCheckout(){
    localStorage.setItem('checkoutcart', this.getLocalStorage());
    this.router.navigate(['/checkout']);
  }

  getSizedPrice(precio, mode){
    switch(mode){
      case 'Mediano':
        return Math.ceil(precio).toString();
      case 'Grande':
        return Math.ceil(precio*1.2).toString();
      case 'Pequeño':
        return Math.ceil(precio*0.8).toString();
      case '':
        return precio;
    }
  }

}
