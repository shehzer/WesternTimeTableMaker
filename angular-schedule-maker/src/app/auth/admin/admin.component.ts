import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
public username
public users = [];
isDisplay2 = false

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  getUserinfo(){
    this.authService.userInfo(this.username).subscribe((res:any) => {
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
}

// display(){
//   this.authService.display(this.scheduleName).subscribe((res:any)=>{
//     var results = []
//     let i =1;
//     var exists = 
//     res.map(function(d){
//       console.log(res[1])
//       if(i<=2){
//         var info = {

//             "Creator": res[0].Creator,
//             "Numcourses": res[0].Numcourses,
//             "scheduleName": res[0].scheduleName,
//             "catalog_description": res[i][0].catalog_description,
//             "catalog_nbr": res[i][0].catalog_nbr,
//             "subject": res[i][0].subject,
            
//           }
//           results.push(info)
//           i++; 
//         }
//       return info;     
         
//     });
//     this.schedules= results;
//     console.log(this.schedules)
//   })
// }
toggleDisplay2(){
  this.isDisplay2 = !this.isDisplay2;
}





}
