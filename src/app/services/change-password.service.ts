import { Injectable } from '@angular/core';

import { ToastrService } from 'ngx-toastr';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ChangePasswordService {

  user: any;

  constructor(private toastr: ToastrService, private router: Router) { }

  validation(currentPassword: string,  newPassword: string, newPasswordRep: string){

    if(newPassword == newPasswordRep){

      this.user = firebase.auth().currentUser;

      this.user.reauthenticateWithCredential(
        firebase.auth.EmailAuthProvider.credential(firebase.auth().currentUser.email, currentPassword)
      )
      .then(() => {
        this.changePassword(newPassword);
      })
      .catch((error) => {
        if(error.code == "auth/wrong-password"){
          this.toastr.error('Contraseña actual incorrecta', 'Error');
        }
        else{
          this.toastr.error('No estás conectado a Internet', 'Desconectado');
        }
      });
    }
    else{
      this.toastr.error('Las contraseñas no coinciden', 'Error');
    }
  }

  changePassword(newPassword: string){
    this.user.updatePassword(newPassword)
      .then(() => {
        this.toastr.success('Tu contraseña ha sido cambiada\nRedireccionando...', 'Éxito');
        setTimeout(() => {
          this.router.navigate(['/dashboard']);
        }, 3000);
      })
      .catch((error) => {
        if(error.code == "auth/weak-password"){
          this.toastr.error('La contraseña debe tener al menos 6 caracteres', 'Error');
        }
        else{
          this.toastr.error(error.message, 'Error');
        }
      })
  }
}