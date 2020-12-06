import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';
import {NgForm} from '@angular/forms';
import {AlertService} from 'ngx-alerts'
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  constructor(private authService: AuthService,   private alertService: AlertService) { }

  ngOnInit(): void {
  }

  onSubmit(f: NgForm) {
    this.alertService.info('Updating...');
    this.authService.update(f.value).subscribe((res:any)=>{
      this.alertService.success('Updated!');
      console.log(res);
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
