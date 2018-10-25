import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'app-comidainfo',
  templateUrl: './comidainfo.component.html',
  styleUrls: ['./comidainfo.component.css']
})
export class ComidainfoComponent implements OnInit {

  title;
  bodyText;
  price;
  img;
  select;
  index;

  constructor(public modalRef: BsModalRef) { }

  ngOnInit() {
    this.select = document.getElementById('size');
  }

  addToCart(){
    var a = [];
    // Parse the serialized data back into an aray of objects
    a = JSON.parse(localStorage.getItem('cart'));
    // Push the new data (whether it be an object or anything else) onto the array
    a.push({title: this.title, price: this.price, mode: this.select.options[this.select.selectedIndex].value, img: this.img, index:a.length});
    // Re-serialize the array back into a string and store it in localStorage
    localStorage.setItem('cart', JSON.stringify(a));
    console.log("added");
  }

}
