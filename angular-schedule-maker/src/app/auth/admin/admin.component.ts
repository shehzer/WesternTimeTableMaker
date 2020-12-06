import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';
import {AlertService} from 'ngx-alerts'
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
public username
public users = [];
isDisplay2 = false

  constructor(private authService: AuthService,
    private alertService: AlertService) { }

  ngOnInit(): void {
  }

  toggleDisplay2(){
    this.isDisplay2 = !this.isDisplay2;
  }

  getUserinfo(){
    this.authService.userInfo(this.username).subscribe((res:any) => {
      this.alertService.success('Found!');
      console.log(res);
      var results = []
      results.push(res);
      console.log(results)
      var exists =
      results.map(function(d){
        var info = {
          "Date": results[0].Date,
          "active": results[0].active,
          "email": results[0].email,
          "name": results[0].name,
          "password": results[0].password,
          "role": results[0].role  
        }
        return info;
      });
      this.users = exists;
      console.log(this.users)    
  }); 
  this.alertService.warning('Finding user..');
   

}

changeRole(){
  this.authService.changeRole(this.username).subscribe((res:any)=>{
    console.log(res);
  })
}

changeAdmin(){
  this.authService.changeAdmin(this.username).subscribe((res:any)=>{
    console.log(res);
  })
}

activate(){
  this.authService.activate(this.username).subscribe((res:any)=>{
    console.log(res);
  })
}

deactivate(){
  this.authService.deactivate(this.username).subscribe((res:any)=>{
    console.log(res);
  })
}







}
