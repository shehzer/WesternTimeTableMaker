import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';
import { Observable, of } from 'rxjs';
@Component({
  selector: 'app-authorized',
  templateUrl: './authorized.component.html',
  styleUrls: ['./authorized.component.css']
})
export class AuthorizedComponent implements OnInit {
  public scheduleName;

  constructor(private authService: AuthService,) { }

  ngOnInit(): void {
  }

  createSchedule(){
    console.log(this.scheduleName);
    this.authService.createSchedule(this.scheduleName).subscribe((res:any)=>{
      console.log(res);
      if(res.status ===404){
        document.getElementById('display').textContent = "Name exists, please use a new name!"
      }
      else{
        document.getElementById('display').textContent = "Schedule"+ this.scheduleName + "has been created"
      }
    }),
      error => {
        console.error("Error creating schedule!");
        return Observable.throw(error);
      }
  }

}
