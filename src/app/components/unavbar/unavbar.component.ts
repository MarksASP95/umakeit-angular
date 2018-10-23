import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-unavbar',
  templateUrl: './unavbar.component.html',
  styleUrls: ['./unavbar.component.css']
})
export class UnavbarComponent implements OnInit {

  show: boolean = true;

  constructor() { }

  ngOnInit() {

    // SHOW OPTIONS WHEN CLICKING USERNAME
    $(document).ready(function(){
      $('#up-bar span').on('click', function() {
        let opcUser = $('#opc-user');
        opcUser.css('display') == 'block' ? opcUser.css({display: 'none'}) : opcUser.css({display: 'block'});
      });  
    });

  }
}
