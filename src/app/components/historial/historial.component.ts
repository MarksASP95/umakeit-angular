import { Component, OnInit } from '@angular/core';

import { UserService } from '../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ComidaService } from 'src/app/services/comida.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.css']
})
export class HistorialComponent implements OnInit {

  constructor(private userService: UserService,
    private route: ActivatedRoute,
    private comidaService: ComidaService,
    private router: Router,
    private toastr: ToastrService) { }

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
              avaiable: snap.order.result.avaiable,
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
    let canRebuy = true;
    for(let i = 0; i < tableRows.length; i++){
      
      if(tableRows[i].attributes['data-avaiable'].nodeValue == "false"){
        this.toastr.error('Esta compra tiene productos no disponibles', 'Error');
        canRebuy = false;
        break;
      }
      else{
        let mode;
        if(tableRows[i].children[2].innerHTML == "---"){
          mode = '';
        }
        else{
          mode = <HTMLElement> tableRows[i].children[2].children[0];
          mode = mode.value;
        }
  
        let tableRowInfo = {
          uid: tableRows[i].attributes['data-uid'].nodeValue,
          mode: mode,
          amount: tableRows[i].children[3].innerHTML
        };
  
        checkoutCart.push(tableRowInfo);
      }
    }
    console.log(checkoutCart);
    if(checkoutCart.length == 0 && canRebuy){
      canRebuy = false;
      this.toastr.error('¡No puedes comprar si no tienes productos!', 'Error');
    }
    else if(canRebuy){
      //console.log(JSON.stringify(checkoutCart));
      localStorage.checkoutcart = JSON.stringify(checkoutCart);
      this.router.navigate(['/checkout']);
    }
  }

  removeRow(clickedBtn){
    clickedBtn.parentNode.parentNode.remove();
  }
  

}

