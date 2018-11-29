import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ComidaService } from 'src/app/services/comida.service';
import { UserService } from 'src/app/services/user.service';

import * as $ from 'jquery';

declare let paypal: any;

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit{

  comidas;
  total: number = 0;
  
  addScript: boolean = false;
  finalAmount: number = 10;
  paypalLoad: boolean = true;

  address: string;

/*   userUid: string; */

  constructor(private router: Router,
              private comidaService: ComidaService,
              private route: ActivatedRoute,
              private userService: UserService) { }

  ngOnInit() {

    this.comidas = JSON.parse(localStorage.getItem('checkoutcart'));

    let arrayUids = this.getComidasArray(this.comidas);

    let queryResult = this.comidaService.getCartComidas(arrayUids);

    queryResult.subscribe(comidas => {
      this.comidas = comidas.map(snap => {
        let obj = {
          name: snap.result.name,
          desc: snap.result.desc,
          price: snap.result.price,
          img: snap.result.img,
          amount: snap.amount,
          mode: snap.mode
        }
        return obj;
      });
    });
   
    setTimeout(() => {
      let prices = document.querySelectorAll("table tr td:last-child");
      for(let i = 0; i < prices.length; i++){
        console.log(prices[i].innerHTML.substr(1));
        this.total += Number.parseInt(prices[i].innerHTML.substr(1));
      }
      console.log(this.total);
    }, 1000);

  }

  getComidasArray(cartObject: Object[]){
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

  paypalConfig =  {
    env: 'sandbox',
    client: {
      sandbox: 'AZDxjDScFpQtjWTOUtWKbyN_bDt4OgqaF4eYXlewfBP4-8aqX3PiV8e1GWU6liB2CUXlkA59kJXE7M6R',
      production: '<your-production-key-here>'
    },
    commit: true,
    payment: (data, actions) => {
      return actions.payment.create({
        payment: {
          transactions: [
            {amount: {total: this.total, currency: 'USD'}}
          ]
        }
      });
    },
    onAuthorize: (data, actions) => {
      return actions.payment.execute().then(payment => {
        // do something when payment is successful
        this.afterSuccessfulPay();
        
      })
    }
  };

  ngAfterViewChecked(){
    if(!this.addScript){
      this.addPaypalScript().then(() => {
        paypal.Button.render(this.paypalConfig, 'paypal-checkout-btn');
        this.paypalLoad = false;
      })
    }
  }

  addPaypalScript(){
    this.addScript = true;
    return new Promise((resolve, reject) => {
      let scripttagElement = document.createElement('script');
      scripttagElement.src = 'https://www.paypalobjects.com/api/checkout.js';
      scripttagElement.onload = resolve;
      document.body.appendChild(scripttagElement);
    });
  }

  afterSuccessfulPay(){

    let rows = document.querySelectorAll('table tbody tr');
    let dataPedido = {};
    let foods = [];
    for(let i = 0; i < rows.length; i++){
      let food = {};
      console.log(rows[i]);
      food = {
        name: rows[i].children[1].innerHTML,
        mode: rows[i].children[2].innerHTML,
        amount: rows[i].children[3].innerHTML
      }

      foods.push(food);
    }

    dataPedido = {
      foods: foods,
      address: this.address,
      time: new Date()
    }

    this.comidaService.addPedido(dataPedido);

    this.router.navigate(['/ready']);
    console.log('PAID');
    //console.log(this.userUid);
    this.userService.storeCart(this.route.snapshot.data.userInfo.username);
  }

  handleTextarea(event){
    if(this.address.length == 0){
      $('.purchase').css('display','none');
      
    }
    else{
      $('.purchase').css('display','block');
    }
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
