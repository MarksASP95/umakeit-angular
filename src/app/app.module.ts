import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { environment } from '../environments/environment';

import { CoreModule } from './core/core.module';

// ngx-bootstrap
import { ModalModule } from 'ngx-bootstrap';
import { TabsModule } from 'ngx-bootstrap';

// firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuth } from 'angularfire2/auth';

// components
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UnavbarComponent } from './components/unavbar/unavbar.component';
import { ComidainfoComponent } from './components/comidainfo/comidainfo.component';

// services
import { AdminService } from './services/admin.service';
import { ComidaService } from './services/comida.service';
import { LogRegComponent } from './components/log-reg/log-reg.component';
import { SearchComponent } from './components/search/search.component';
import { CartComponent } from './components/cart/cart.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'auth',
    component: LogRegComponent
  },
  {
    path: 'search',
    component: SearchComponent
  },
  {
    path: 'cart',
    component: CartComponent
  }
]


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    UnavbarComponent,
    ComidainfoComponent,
    LogRegComponent,
    SearchComponent,
    CartComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    ModalModule.forRoot(),
    RouterModule.forRoot(routes),
    TabsModule.forRoot(),
    FormsModule,
    CoreModule
  ],
  providers: [
    AdminService,
    ComidaService,
    SearchComponent,
    AngularFireAuth
  ],
  bootstrap: [AppComponent],
  entryComponents: [ComidainfoComponent]
})
export class AppModule { }
