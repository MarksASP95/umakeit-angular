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
      opcUser.css('display') == 'block' ? opcUser.css({display: 'none'}) : opcUser.css({display: 'block'});
    });  
  
  }

  @Input() showSearch: boolean;
  @Input() showUser: boolean;
  username: string;
  searchText: string;

  constructor(public router: Router, public comidaService: ComidaService, public searchComponent: SearchComponent, public auth: AuthService, private route: ActivatedRoute) { }

  ngOnInit() {
    //console.log(this.route.snapshot.data); 
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
