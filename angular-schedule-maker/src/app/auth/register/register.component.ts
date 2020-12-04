import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {RouterModule} from '@angular/router'
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  selectedOption: string;
  printedOption: string;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }
  onSubmit(f: NgForm) {
    console.log(f.value);  // { first: '', last: '' }
    f.value.role.toUpperCase();
    f.value.role = f.value.role.toUpperCase();
    console.log(f.value.role.toUpperCase());
    console.log(f.value);
    console.log(f.valid);  // false
    this.authService.register(f.value).subscribe((res:any)=>{
      console.log(res);
    }),
    error => {
      console.log(error)
    }
  }
}
