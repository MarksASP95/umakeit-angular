import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $(document).ready(function(){
      $(document).on('click', 'table tr', function(){
          let foodImage = $(this).attr('data-img-url');
          let foodMeta = [];
          $(this).children().each(function(){
              foodMeta.push($(this).html());
          });
  
          $("input[name='nombre']").val(foodMeta[0]);
          $("textarea[name='desc']").val(foodMeta[1]);
          $("input[name='precio']").val(foodMeta[2]);
  
          $(this).attr('data-checked') == "1" ? $('#modificable').prop("checked",true) : $('#modificable').prop("checked",false);
  
          $('#food_image').css({'background-image': `url('img/${foodImage}')`});
          
          $('input, textarea, button').each(function(){
              $(this).prop('disabled', false);
          });
      });
  
      $('form').on('submit', function(){
          alert('Producto editado');
      })
  });
  }

}
