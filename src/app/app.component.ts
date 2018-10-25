import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements OnInit{

  ngOnInit(){
/*     if(document.cookie === "" && document.location.pathname !== "/auth" && document.location.pathname !== "/"){
      document.location.href = "/";
    } */
  }

  title = 'umakeit';
}
