import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthService } from '../services/auth.service';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: []
})
export class CoreModule { }
