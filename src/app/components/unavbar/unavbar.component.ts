import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import * as $ from 'jquery';

import { ComidaService } from '../../services/comida.service';
import { AuthService } from '../../services/auth.service';

import { SearchComponent } from '../search/search.component';

@Component({
  selector: 'app-unavbar',
  templateUrl: './unavbar.component.html',
  styleUrls: ['./unavbar.component.css']
})
export class UnavbarComponent implements OnInit, AfterViewInit {

  ngAfterViewInit(){

    // Show options when clicking username
    $('.username').on('click', function() {
      let opcUser = $('#opc-user');
      opcUser.css('display') == 'block' ? opcUser.fadeOut(50) : opcUser.fadeIn(50);
    });  
  
  }

  @Input() showSearch: boolean;
  @Input() showUser: boolean;
  @Input() showCart: boolean = true;
  username: string;
  searchText: string;

  constructor(public router: Router, public comidaService: ComidaService, public searchComponent: SearchComponent, public auth: AuthService, public route: ActivatedRoute) { }

  ngOnInit() {
    //console.log(this.route.snapshot.data); 
    $(document).ready(function(){
      $('body').css({overflow:"scroll"});

      $('#menu-btn').on('click', function(){
        $('#hidden-menu').css({left:0});
        $('body').css({overflow:"hidden"});
    });
  
    $('#close').on('click', function(){
        $('#hidden-menu').css({left:'100%'});
        $('body').css({overflow:"scroll"});
    })
    })
  }
  
  submitSearch(searchText: string){
    console.log("Submitted");
    this.comidaService.changeSearchText(searchText);
    if(this.router.url !== '/search'){
      this.router.navigate(['search']);
    }
    else{
      this.searchComponent.ngOnInit();
    }
  }

  signOut(){
    this.auth.signOut();
    location.reload();
  }
}
