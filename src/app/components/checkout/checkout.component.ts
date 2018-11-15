import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  comidas;
  total: number = 0;

  constructor() { }

  ngOnInit() {

    this.comidas = JSON.parse(localStorage.getItem('cart'));

    for(let i = 0; i < this.comidas.length; i++){
      this.total += this.comidas[i].price * this.comidas[i].amount;
    }

  }

}
