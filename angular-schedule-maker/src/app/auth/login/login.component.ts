import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';
import {AlertService} from 'ngx-alerts'
import { throwError } from 'rxjs';


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
    localStorage.setItem('token',"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmNiY2ZlM2YzMTQ2YzY4NDU4OTQxODUiLCJfdXNlcm5hbWUiOiJKYWNreSIsIl9yb2xlIjoiTUFOQUdFUiIsIl9hY3RpdmUiOiJkZWFjdGl2YXRlZCIsIl9lbWFpbCI6ImpvZXNwaEBnbWFpbC5jb20iLCJpYXQiOjE2MDcyMzM4OTl9.brkOmiESYffOkYzAot07AV-4Xry07hVMWAduaxC50L8")

    this.alertService.info('Checking User Info');
    this.authService.login(f.value).subscribe((res:any)=>{
      console.log(res)
      localStorage.setItem('token',res)
      let jwt = localStorage.getItem('token');
      let jwtData = jwt.split('.')[1]
      let decodedJwtJsonData = window.atob(jwtData)
      let decodedJwtData = JSON.parse(decodedJwtJsonData)
      let isActive = decodedJwtData._active;
      if(isActive=== "deactivated"){
        this.loggedIn = false;
        this.alertService.warning('Account is deactivated talk to admin');
      }
      else{
        this.alertService.success('Logged In!');
        this._router.navigate(['authorized'])
      }
    })
    if(this.loggedIn == true){
      this.alertService.warning('Invalid credentials');
    }
  }
}
