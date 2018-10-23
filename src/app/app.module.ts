import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// firebase
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';

// components
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

// services
import { AdminService } from './services/admin.service';
import { ComidaService } from './services/comida.service';
import { UnavbarComponent } from './components/unavbar/unavbar.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    UnavbarComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule
  ],
  providers: [
    AdminService,
    ComidaService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
