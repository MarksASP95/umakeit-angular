import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ChangePasswordService } from '../../services/change-password.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  currentPassword: string;
  newPassword: string;
  newPasswordRep: string;
  user: any;

  constructor(private router: Router, public changePasswordService: ChangePasswordService, private toastr: ToastrService) { }

  ngOnInit() {
  }

}
