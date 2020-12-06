import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { PublicComponent } from './public/public.component';
import { AdminComponent } from './admin/admin.component';
import { AuthorizedComponent } from './authorized/authorized.component';



@NgModule({
  declarations: [LoginComponent, RegisterComponent, ResetPasswordComponent, PublicComponent, AdminComponent, AuthorizedComponent, ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule
  ],

  exports: [
    LoginComponent, RegisterComponent, ResetPasswordComponent
  ]
})
export class AuthModule { }
