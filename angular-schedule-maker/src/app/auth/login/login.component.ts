import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService,
               private _router: Router) { }
  token;
  ngOnInit(): void {
  }

  onSubmit(f: NgForm) {
    this.authService.login(f.value).subscribe((res:any)=>{
      console.log(res);
      localStorage.setItem('token',res)
      this._router.navigate(['authorized'])
    }),
    error => {
      console.log(error)
    }

    console.log(f.value);  // { first: '', last: '' }
    console.log(f.valid);  // false
    // const loginObserver = {
    //   next: x => console.log('User Logged in' + x),
    //   error: err => console.log(err)
    // };

    // this.authService.login(f.value).subscribe(loginObserver);
  }

}
