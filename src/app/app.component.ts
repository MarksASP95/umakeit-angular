import { Component, OnInit } from '@angular/core';

import { ConnectionService } from 'ng-connection-service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements OnInit{

  isConnected: boolean;

  constructor(private connectionService: ConnectionService, private toastr: ToastrService){
    
    this.connectionService.monitor().subscribe(isConnected => {
      this.isConnected = isConnected;
      if (this.isConnected) {
        this.toastr.success('Conexión recuperada', "Conectado");
      }
      else {
        this.toastr.error('Has perdido la conexión', 'Desconectado');
      }
    })
  }

  ngOnInit(){
    if(!localStorage.cart){
      localStorage.setItem('cart','[]');
    }
    
  }

  title = 'umakeit';
}
