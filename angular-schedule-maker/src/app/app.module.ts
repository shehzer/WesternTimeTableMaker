import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives heres

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

import { ClassServiceService} from './class-service.service';
import { AuthModule } from './auth/auth.module';
import { SharedModule } from './shared/shared.module';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { HomeComponent } from './pages/home/home.component';
import { AuthguardGuard } from './auth/authguard.guard';
import { AdminGuard } from './auth/admin.guard';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    AuthModule,
    SharedModule,
    MDBBootstrapModule.forRoot(),
  ],
  schemas: [ NO_ERRORS_SCHEMA],
  providers: [ClassServiceService, AuthguardGuard, AdminGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
