import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';
import {AlertService} from 'ngx-alerts'


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService,
               private _router: Router,
               private alertService: AlertService) { }
  token;
  loggedIn =true;
  ngOnInit(): void {
  }

  onSubmit(f: NgForm) {
    this.alertService.info('Checking User Info');
    this.authService.login(f.value).subscribe((res:any)=>{
      this.loggedIn = false;
      console.log(this.loggedIn)
      console.log(res);
      console.log(res._role);
      this.alertService.success('Logged In');
      localStorage.setItem('token',res)
      this._router.navigate(['authorized'])
    })
    console.log(this.loggedIn)
   if(this.loggedin()){
    this.alertService.warning('Check username or Password');
   }
  }

  loggedin(){
    return this.loggedIn == true;
  }

}
