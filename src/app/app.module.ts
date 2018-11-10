import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { environment } from '../environments/environment';

import { CoreModule } from './core/core.module';

// ngx-toastr
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// ngx-bootstrap
import { ModalModule } from 'ngx-bootstrap';
import { TabsModule } from 'ngx-bootstrap';

// firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireStorageModule } from '@angular/fire/storage';

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
import { PanelComponent } from './components/admin/panel/panel.component';
import { AddComponent } from './components/admin/add/add.component';
import { HabDesComponent } from './components/admin/hab-des/hab-des.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { EditComponent } from './components/admin/edit/edit.component';
import { AuthGuard } from './services/auth.guard';
import { AdminGuard } from './services/auth.adminguard';
import { ResolveGuard } from './services/resolve.guard';
import { ResolveUnavbar } from './services/resolve.unavbar';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    resolve: {
      userInfo: ResolveUnavbar
    }
  },
  {
    path: 'auth',
    component: LogRegComponent,
    resolve: {
      userInfo: ResolveUnavbar
    }
  },
  {
    path: 'search',
    component: SearchComponent,
    resolve: {
      userInfo: ResolveUnavbar
    }
  },
  {
    path: 'cart',
    component: CartComponent,
    resolve: {
      userInfo: ResolveUnavbar
    }
  },
  {
    path: 'cambiar_clave',
    canActivate: [AuthGuard],
    resolve: {
      userInfo: ResolveUnavbar
    },
    component: ChangePasswordComponent
  },
  {
    path: 'admin',
    canActivate: [AdminGuard],
    resolve: {
      userInfo: ResolveUnavbar
    },
    children: [
      {
        path: '',
        redirectTo: 'panel',
        pathMatch: 'full'
      },
      {
        path: 'panel',
        component: PanelComponent
      },
      {
        path: 'agregar',
        component: AddComponent
      }
    ]
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
    CartComponent,
    PanelComponent,
    AddComponent,
    HabDesComponent,
    ChangePasswordComponent,
    EditComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    ModalModule.forRoot(),
    RouterModule.forRoot(routes),
    TabsModule.forRoot(),
    FormsModule,
    CoreModule,
    AngularFireStorageModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [
    AdminService,
    ComidaService,
    SearchComponent,
    AngularFireAuth,
    AuthGuard,
    AdminGuard,
    ResolveGuard,
    ResolveUnavbar
  ],
  bootstrap: [AppComponent],
  entryComponents: [ComidainfoComponent]
})
export class AppModule { }
