import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { AuthguardGuard } from './authguard.guard';
import { AuthorizedComponent } from './authorized/authorized.component';
import { LoginComponent } from './login/login.component';
import { PublicComponent } from './public/public.component';
import { RegisterComponent } from './register/register.component';
import {ResetPasswordComponent} from './reset-password/reset-password.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'reset', component: ResetPasswordComponent},
  { path: 'public', component: PublicComponent},
  { path: 'admin', component: AdminComponent  },
  {path: 'authorized', component: AuthorizedComponent, canActivate:[AuthguardGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
