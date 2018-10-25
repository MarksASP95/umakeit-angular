import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import * as $ from 'jquery';

import { ComidaService } from '../../services/comida.service';
import { AuthService } from '../../core/auth.service';

import { SearchComponent } from '../search/search.component';

@Component({
  selector: 'app-unavbar',
  templateUrl: './unavbar.component.html',
  styleUrls: ['./unavbar.component.css']
})
export class UnavbarComponent implements OnInit {

  @Input() showSearch: boolean;
  @Input() showUser: boolean;
  username: string;
  searchText: string;
  currentUser;

  constructor(public router: Router, public comidaService: ComidaService, public searchComponent: SearchComponent, public auth: AuthService) { }

  ngOnInit() {


    // SHOW OPTIONS WHEN CLICKING USERNAME


    $(document).ready(function(){
      $(document).on('click', '.username', function() {
        let opcUser = $('#opc-user');
        opcUser.css('display') == 'block' ? opcUser.css({display: 'none'}) : opcUser.css({display: 'block'});
      });  
    });


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
    /* document.cookie = "";
    document.location.href = "/"; */
    this.auth.signOut();
    location.reload();
  }
}
