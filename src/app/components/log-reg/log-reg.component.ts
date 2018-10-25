import { Component, ViewChild, OnInit } from '@angular/core';
import { TabsetComponent } from 'ngx-bootstrap';
import { UserService } from '../../services/user.service';
import { User } from 'src/app/models/user';

import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-log-reg',
  templateUrl: './log-reg.component.html',
  styleUrls: ['./log-reg.component.css']
})
export class LogRegComponent implements OnInit {

  @ViewChild('staticTabs') staticTabs: TabsetComponent;

  user = {} as User;
  users = [];
  userExists: boolean = false;

  constructor(public userService: UserService, public auth: AuthService) { }

  ngOnInit() {
  }

  selectTab(tab_id: number) {
    this.staticTabs.tabs[tab_id].active = true;
  }

  submitRegister(){
    //this.userService.addUser(this.user);
    this.auth.signUp(this.user.email,this.user.password, this.user.username);
  }

  submitLogin(){
 /*    this.userService.getUser(this.user.username).subscribe(users => {
      this.users = users.map(snap => {
        let obj = {
          username:snap.payload.doc.id,
          ...snap.payload.doc.data()
        }
        this.userExists = true;
        document.cookie = obj.username;
      });
      if(this.userExists){
        this.userExists = false;
        document.location.href = "/dashboard";
      }
      else{
        console.log("No existe")
      }
    }); */

    //this.auth.emailAndPassword("marcosuarezpetrillo@hotmail.com","matuididios14");

    this.auth.emailLogin(this.user.email,this.user.password);
    
    
  }
}

/* this.userService.getUser().subscribe(users => {
  this.users = users.map(snap => {
    let obj = {
      username: snap.payload.doc.id,
      ...snap.payload.doc.data()
    }
    console.log(obj);
    return obj;
  })
});    
*/