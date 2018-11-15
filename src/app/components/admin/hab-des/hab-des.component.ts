import { Component, OnInit } from '@angular/core';

import * as $ from 'jquery';
import { ToastrService } from 'ngx-toastr';

import { ComidaService } from '../../../services/comida.service';
import { Comida } from 'src/app/models/comida';

@Component({
  selector: 'app-hab-des',
  templateUrl: './hab-des.component.html',
  styleUrls: ['./hab-des.component.css']
})
export class HabDesComponent implements OnInit {

  comidas = [];
  comida: Comida = {};
  buttonText: string = '---';
  avaiable: boolean;

  constructor(private comidaService: ComidaService, private toastr: ToastrService) { }

  ngOnInit() {

    $(document).ready(function(){
      $("table").on('click', 'tr', function() {

        $(this).siblings().removeClass("selected-and-not-av");
        $(this).siblings().removeClass("selected-and-av");

        if($(this).hasClass('not-avaiable')){
          $(this).addClass("selected-and-not-av");
        }
        else{
          $(this).addClass("selected-and-av");
        }
      });
    });

    this.comidaService.getAllComidas().subscribe(comidas => {
      this.comidas = comidas.map(snap => {
        let obj = {
          id: snap.payload.doc.id,
          ...snap.payload.doc.data()
        }
        return obj;
      });
    });
  }

  getInfo(comida){

    this.comida.$id = comida.id;
    this.comida.avaiable = comida.avaiable;

    if(comida.avaiable === true){
      this.buttonText = 'Deshabilitar';
    }
    else{
      this.buttonText = 'Habilitar';
    }
  }

  execute(){
    let result;
    if(this.comida.avaiable){
      result = 'desabilitado';
    }
    else{
      result = 'habilitado';
    }

    this.comidaService.toggleAvaiable(this.comida.$id, this.comida.avaiable)
      .then(() => {
        this.toastr.success(`Producto ${result}`);
      }).
      catch((error) => {
        this.toastr.error(error);
      });
  }

}
