import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router'
import { AuthService } from 'src/app/shared/auth.service';
import { Observable, of } from 'rxjs';
import {AlertService} from 'ngx-alerts'


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  selectedOption: string;
  printedOption: string;

  constructor(private authService: AuthService,
    private alertService: AlertService) { }
    invalid = true;

  ngOnInit(): void {
  }
  onSubmit(f: NgForm) {
    this.alertService.info('Checking for duplicates');
    console.log(f.value);  // { first: '', last: '' }
    f.value.role.toUpperCase();
    f.value.role = f.value.role.toUpperCase();


    this.authService.register(f.value).subscribe((res:any)=>{
      this.invalid = false;
      console.log(res);
      this.alertService.success('Success!');
      
    })

    if(this.invalid == true){
      this.alertService.warning("invalid entry");
    }
  
    

    // if( HttpErrorResponse)
    
    //   console.log(HttpErrorResponse)
  }
}

