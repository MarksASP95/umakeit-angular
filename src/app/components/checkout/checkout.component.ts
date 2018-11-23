import { Component, OnInit } from '@angular/core';

declare let paypal: any;

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  comidas;
  total: number = 0;
  
  addScript: boolean = false;
  finalAmount: number = 10;
  paypalLoad: boolean = true;

  constructor() { }

  ngOnInit() {

    this.comidas = JSON.parse(localStorage.getItem('cart'));

    for(let i = 0; i < this.comidas.length; i++){
      this.total += this.comidas[i].price * this.comidas[i].amount;
    }

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
        console.log('PAID');
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

}
