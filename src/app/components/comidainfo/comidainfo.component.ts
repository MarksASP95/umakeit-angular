import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

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

  constructor(private modalRef: BsModalRef, private toastr: ToastrService) { }

  ngOnInit() {
    this.select = document.getElementById('size');
  }

  addToCart(){
    var a = [];
    // Parse the serialized data back into an aray of objects
    a = JSON.parse(localStorage.getItem('cart'));
    // Push the new data (whether it be an object or anything else) onto the array
    a.push({name: this.title, price: this.price, mode: this.select.options[this.select.selectedIndex].value, img: this.img, index:a.length});
    // Re-serialize the array back into a string and store it in localStorage
    localStorage.setItem('cart', JSON.stringify(a));
    
    this.toastr.success("Añadido al carrito");
  }

}
