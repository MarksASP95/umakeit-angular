import { Component, OnInit } from '@angular/core';

import * as $ from 'jquery';
import { ToastrService } from 'ngx-toastr';

import { ComidaService } from '../../../services/comida.service';
import { Comida } from 'src/app/models/comida';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  comidas = [];
  comidaForm = {};

  constructor(private comidaService: ComidaService, private toastr: ToastrService) { }

  ngOnInit() {

    this.comidaService.getAllComidas().subscribe(comidas => {
        this.comidas = comidas.map(snap => {
          let obj = {
            id: snap.payload.doc.id,
            ...snap.payload.doc.data()
          }
          return obj;
        });
    });

    $(document).ready(function(){
      $(document).on('click', 'table tr', function(){
          let foodMeta = [];
          $(this).children().each(function(){
              foodMeta.push($(this).html());
          });
  
/*           $("input[name='nombre']").val(foodMeta[0]);
          $("textarea[name='desc']").val(foodMeta[1]);
          $("input[name='precio']").val(foodMeta[2]); */
          
          $('input, textarea, button').each(function(){
              $(this).prop('disabled', false);
          });
      });
    });


  }

  setUpForm(comida){
    $('#food_image').css({'background-image': `url('${comida.img}')`});

    this.comidaForm = {
        name: comida.name,
        desc: comida.desc,
        price: parseFloat(comida.price),
        modificable: $('#modificable').prop('checked'),
        $id: comida.id,
        img: comida.img
    }

    $('#modificable').prop('checked', comida.avaiable);

  }

  editar(){

    this.comidaService.updateComida(this.comidaForm as Comida)
        .then(() => {
            this.toastr.success('Producto editado');
        });

  }

  

}
