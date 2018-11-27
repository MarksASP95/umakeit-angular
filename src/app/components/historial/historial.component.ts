import { Component, OnInit } from '@angular/core';

import { UserService } from '../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ComidaService } from 'src/app/services/comida.service';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.css']
})
export class HistorialComponent implements OnInit {

  constructor(private userService: UserService,
    private route: ActivatedRoute,
    private comidaService: ComidaService,
    private router: Router) { }

  carts = [];
  cartsDisplay = [];

  ngOnInit() {
    this.userService.getCarts(this.route.snapshot.data.userInfo.username).subscribe(carts =>{
      this.carts = carts.map(snap => {
        let obj = {
          ...snap.payload.doc.data()
        }
        return obj;
      });

      this.showCarts();

      //console.log(this.carts);
    });

   /*  this.comidaService.getComidaName().subscribe(comida => {
      console.log(comida);
    }) */

    
  }

  showCarts(){
    this.cartsDisplay = [];
    for(let i = 0; i < this.carts.length; i++){
      
      let queryResult = this.comidaService.getCartsComidas(this.carts[i].cart);
      //console.log(this.carts[0].cart);
      var cart;
      let foods = [];
      let time;
      
      queryResult.subscribe(carts => {
        carts.map(snap => {
          let food = {
              name: snap.order.result.name,
              desc: snap.order.result.desc,
              price: snap.order.result.price,
              img: snap.order.result.img,
              amount: snap.order.amount,
              mode: snap.order.mode,
              uid: snap.order.uid
            }
            foods.push(food);
            time = snap.time.toDate();
            // console.log(obj);
        });
        cart = {
          foods: foods,
          time: time.getDate() + '/' + time.getMonth() + '/' + time.getFullYear()
        }

        this.cartsDisplay.push(cart);
        //console.log(cart);
      });
      
    }


    //console.log(this.cartsDisplay);

    
  }

  getOtherOptions(originalOption: string){
    switch(originalOption){
      case 'Grande':
        return ['Mediano','Pequeño'];
      case 'Mediano':
        return ['Grande','Pequeño'];
      case 'Pequeño':
        return ['Mediano','Grande'];
    }
  }
  
  recomprar(tableid){
    let checkoutCart = [];

    //let table = document.getElementById('table'+tableid);
    let tableRows = document.querySelectorAll("#table" + tableid + " tbody tr");

    for(let i = 0; i < tableRows.length; i++){

      let mode;
      if(tableRows[i].children[1].innerHTML == "---"){
        mode = '';
      }
      else{
        mode = tableRows[i].children[1].children[0].value;
      }

      let tableRowInfo = {
        uid: tableRows[i].attributes['data-uid'].nodeValue,
        mode: mode,
        amount: tableRows[i].children[2].innerHTML
      };

      checkoutCart.push(tableRowInfo);
    }

    //console.log(JSON.stringify(checkoutCart));
    localStorage.checkoutcart = JSON.stringify(checkoutCart);
    this.router.navigate(['/checkout']);
  }

  

}

