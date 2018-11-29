import { Component, OnInit } from '@angular/core';
import { ComidaService } from 'src/app/services/comida.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent implements OnInit {

  constructor(private comidaService: ComidaService) { }

  pedidos = [];

  ngOnInit() {

    this.comidaService.getPedidos().subscribe(pedidos =>{
      this.pedidos = pedidos.map(snap => {
        let obj = {
          ...snap.payload.doc.data()
        }
        return obj;
      })
    })

  }

  formatDate(date){
    return date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear() + ' - ' + date.getHours() + ':' + date.getMinutes();
  }

}
