import { Component, OnInit } from '@angular/core';
import { User } from 'firebase';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-reg-admin',
  templateUrl: './reg-admin.component.html',
  styleUrls: ['./reg-admin.component.css']
})
export class RegAdminComponent implements OnInit {

  user = {} as User;
  users = [];
  userExists: boolean = false;

  constructor(public userService: UserService, public auth: AuthService) { }

  ngOnInit() {
  }

  submitRegister(){
    //console.log(`User: ${this.user.username}\nEmail: ${this.user.email}\nPassword: ${this.user.password}`);
    this.auth.signUp(this.user.email,this.user.password, this.user.username, true);
  }
}
