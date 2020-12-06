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
  public data = [];
  public schedules = [];
  public pschedules = [];
  public oneSchedule = [];
  public subject;
  public course;
  public flag;
  public component;
  public info = {};
  public list;
  public isbuttonvisible = false;

  


  constructor(private authService: AuthService,) { }

  ngOnInit(): void {
  }
  isDisplay = false;
  isDisplay1 = false;
  isDisplay2 = false;
  isDisplay3 = false
  toggleDisplay(){
    this.isDisplay = !this.isDisplay;
  }

  toggleDisplay1(){
    this.isDisplay1 = !this.isDisplay1;
  }

  toggleDisplay2(){
    this.isDisplay2 = !this.isDisplay2;
  }

  toggleDisplay3(){
    this.isDisplay3 = !this.isDisplay3;
  }
  clickMethod(name: string) {
    if(confirm("Are you sure to delete "+this.scheduleName)) {
      this.delete_Schedule();
      console.log("Implement delete functionality here");
    }
  }
  

  //default route , load courses
getCourses(){
  this.authService.getCourses().subscribe((res:any) => {
    document.getElementById('display1').innerHTML = this.makeTable(res); 
    this.isDisplay1 = false;
})
}
//get the subject
getSubject(){
  this.authService.getSubject(this.subject.toUpperCase()).subscribe((res: any) =>{
    this.isDisplay1 = false;
    console.log(res);
    console.log(this.data)
    document.getElementById('display1').innerHTML = this.makeTable(res);    
    console.log(this.makeTable(res));
    

  })
}
//get subs and course
getSubsandCourse(){
  this.isDisplay = false;
  console.log(this.subject);
  console.log(this.course);
   this.authService.getSubsandCourse(this.subject.toUpperCase(), this.course.toUpperCase()).subscribe((res:any)=> {
     console.log(res);
    console.log(this.subject);
    var exists =
    res.map(function(d){
      var i =0, j=0, k=0
      var info = {

          "subject": d.subject,
          "className": d.className,
          "catalog_nbr": d.catalog_nbr,
          "ssr_component": res[i].course_info[j].ssr_component,
          "class_nbr": res[i].course_info[j].class_nbr,
          "start_time": res[i].course_info[j].start_time,
          "end_time": res[i].course_info[j].end_time,
          "campus": res[i].course_info[j].campus,
          "facility_ID": res[i].course_info[j].facility_ID,
          "days": res[i].course_info[j].days[k],
          "class_section": res[i].course_info[j].class_section,
          "enrl_stat": res[i].course_info[j].enrl_stat,
          "descrlong": res[i].course_info[j].descrlong,
          

         }
         i++;
         j++;
         k++
         return info;
    });
    this.data = exists; 
    console.log(exists);
    console.log(this.data);
  })
}


  createSchedule() {
    console.log(this.scheduleName);
    this.authService.createSchedule(this.scheduleName).subscribe((res: any) => {
      console.log(res);
      if (res.status === 404) {
        document.getElementById('display').textContent = "Name exists, please use a new name!"
      }
      else {
        document.getElementById('display').textContent = "Schedule " + this.scheduleName + " has been created"
      }
    }),
      error => {
        console.error("Error creating schedule!");
        return Observable.throw(error);
      }
  }

  //add a new sched
  add_new(){
    this.info = {
      "subjectCode": this.subject,
      "courseCode": this.course
    }
    console.log(this.info);
    console.log(this.scheduleName);
    this.authService.add_new(this.scheduleName, this.info).subscribe((res:any)=>{
      console.log(res);
       document.getElementById('display').textContent = res

    }),
    error =>{
      document.getElementById('display').textContent = "Name Does Not Exists!"
      return document.getElementById('display').textContent = "Name doesn't exist!"
    }
  }

  changeFlag(){
    this.info = {
      "flag": this.flag
    }
    this.authService.changeFlag(this.scheduleName, this.info).subscribe((res:any)=>{
      console.log(res)
    })
  }

  private_List(){
    this.authService.private_list().subscribe((res:any)=>{
      console.log(res);
      this.isDisplay3 = false;
      var results = []
      let i =0;
      let j=0;
      var exists = 
      res.map(function(d){
        console.log(res[1])
    
        if(i<res.length){
          var info = {
    
              "Creator": res[i].Creator,
              "Numcourses": res[i].Numcourses,
              "scheduleName": res[i].scheduleName,
              "catalog_description": res[j+1][0].catalog_description,
              "catalog_nbr": res[j+1][0].catalog_nbr,
              "subject": res[j+1][0].subject,
              
            }
            results.push(info)
            i++; 
          }
        return info;     
           
      });
      console.log(exists);
      this.pschedules= results;
  
    console.log(this.pschedules)
    
      
    })
  }
  display(){
    this.isDisplay2 = false;
    this.authService.display(this.scheduleName).subscribe((res:any)=>{
      console.log(res)
      var results = []
      let i =1;
      var exists = 
      res.map(function(d){
        console.log(res.length)
        console.log(res[1][0].catalog_nbr)
        if(i<res.length){
          var info = {
  
              "Creator": res[0].Creator,
              "Numcourses": res[0].Numcourses,
              "scheduleName": res[0].scheduleName,
              "catalog_nbr": res[i][0].catalog_nbr,
              "className":res[i][0].className,
              "campus":res[i][0].course_info[0].campus,
              "descr":res[i][0].course_info[0].descr,
              "facility_ID":res[i][0].course_info[0].facility_ID,
              "ssr_component":res[i][0].course_info[0].ssr_component,
              "subject": res[i][0].subject,
              "Flag": res[0].Flag
              
            }
            results.push(info)
            i++; 
          }
        return info;     
           
      });
      this.schedules= results;
      console.log(this.schedules)
    })
  }


  delete_Schedule(){
    this.authService.delete_Schedule(this.scheduleName).subscribe((res:any)=>{
      if(res.status === 404){
        document.getElementById('display').textContent = "Schedule Name does not exist!"
      }
      console.log(res);
    
    }),
    error => {
      console.log("Schedule Not deleted");
      document.getElementById('display').textContent = "Error, please try again!"
      return Observable.throw(error);
    }
  }



  makeTable(D){
    var a = '';
    var cols = Object.keys(D[0]);
    a += '<table class = "list"><thead><tr>';
    for(var j=0;j<cols.length;j++) {
      a+= `<th>${cols[j]}</th>`;
    }
    a += '</tr></thead><tbody>';
  
    for(var i=0;i<D.length; i++) {
      a += '<tr>';
      for(j=0;j<cols.length;j++) {
        a += `<td>${D[i][cols[j]]}</td>`;
      }
      a += '</tr>';
    }
    a += '</tbody></table>';
    return a;
  }

}
