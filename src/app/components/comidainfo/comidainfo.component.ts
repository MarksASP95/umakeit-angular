import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import * as $ from 'jquery';

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-comidainfo',
  templateUrl: './comidainfo.component.html',
  styleUrls: ['./comidainfo.component.css']
})
export class ComidainfoComponent implements OnInit {

  title: string;
  bodyText: string;
  price: string;
  img: string;
  select: any;
  index: string;
  modificable: boolean;
  size: string;

  constructor(public modalRef: BsModalRef, private toastr: ToastrService) { }

  ngOnInit() {
    
  }

  changeSize(newValue: string){
    this.select = newValue;
  }

  addToCart(){

    this.select = $('#size').children('option:selected').val();
    if(this.select === undefined){
      this.select = "";
    }

    var a = [];
    // Parse the serialized data back into an aray of objects
    a = JSON.parse(localStorage.getItem('cart'));
    console.log(a.length);
    let i = 0;
    let alreadyIn = false;

    if(a.length > 0){
      while(!alreadyIn && i<a.length){
        if(this.title === a[i].name && (this.select === a[i].mode || this.select === undefined)){
          alreadyIn = true;
          break;
        }
        i++;
      }
  
      if(alreadyIn){
        a[i].amount = a[i].amount + 1;
      }
      else{
        // Push the new data (whether it be an object or anything else) onto the array
        a.push({name: this.title, price: this.price, amount: 1, mode: this.select, img: this.img, index:a.length});
      }
    }
    else{
      a.push({name: this.title, price: this.price, amount: 1, mode: this.select, img: this.img, index:a.length});
    }

    // Re-serialize the array back into a string and store it in localStorage
    localStorage.setItem('cart', JSON.stringify(a));
    
    this.toastr.success("Añadido al carrito");
  }

}
