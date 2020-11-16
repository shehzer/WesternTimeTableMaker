import { Component } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ClassServiceService} from './class-service.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Western-Schedule-Maker';
  public data;
  public subject;
  public course;
  public component;
  public scheduleName;
  public info = {};
  public list;
  
  constructor(private classService: ClassServiceService){ }

  
  
  
  ngOnInit(){
    this.getCourses();
  }

//default route , load courses
  getCourses(){
    this.classService.getCourses().subscribe(
      data => {this.data = data},
      err => console.error(err),
      () => console.log('done loading courses')
    )
  }
//get the subject
  getSubject(){
    this.classService.getSubject(this.subject.toUpperCase()).subscribe((res: any) =>{
      console.log(res);
      document.getElementById('display1').innerHTML = this.makeTable(res);    
      console.log(this.makeTable(res));
      

    })
  }
//get subs and course
  getSubsandCourse(){
    console.log(this.subject);
    console.log(this.course);
     this.classService.getSubsandCourse(this.subject.toUpperCase(), this.course.toUpperCase()).subscribe((res:any)=> {
       console.log(res);
      console.log(this.subject);
      var exists =
      res.map(function(d){
        var i =0, j=0, k=0
        var info = {

            "subject": d.subject,
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
      console.log(exists);
      document.getElementById('display1').innerHTML = this.makeTable(exists);
    })
  }
//get course and sub and component
  getSubsandCourseandComp(){
    console.log(this.subject);
    console.log(this.course);
    console.log(this.component);
    this.classService.getSubsandCourseandComp(this.subject.toUpperCase(), this.course.toUpperCase(), this.component.toUpperCase()).subscribe((res:any)=>{
      if(this.component ==='LEC'||'lec'||'lab'||'LAB'){
        var exists = res.map(function(d){
          var i=0, j=0
          var info = {
              "subject": d.subject,
              "catalog_nbr": d.catalog_nbr,
              "ssr_component": res[i].course_info[j].ssr_component,
          }
          i++;
          j++;
          return info;
        });

      }
                  
                  document.getElementById('display1').innerHTML = this.makeTable(exists);

       })

  }
//create schedule route
  createSchedule(){
    console.log(this.scheduleName);
    this.classService.createSchedule(this.scheduleName).subscribe((res:any)=>{
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
//add a new sched
  add_new(){
    this.info = {
      "subjectCode": this.subject,
      "courseCode": this.course
    }
    console.log(this.info);
    console.log(this.scheduleName);
    this.classService.add_new(this.scheduleName, this.info).subscribe((res:any)=>{
      console.log(res.status);

    }),
    error =>{
      document.getElementById('display').textContent = "Name Does Not Exists!"
      return document.getElementById('display').textContent = "Name doesn't exist!"
    }
  }

  display(){
    this.classService.display(this.scheduleName).subscribe((res:any)=>{
      let result = Object.keys(res).map(e=>{
        var info = {
          "subject": res.subject,
          "course": res.course
        };
        return info;
      });
      console.log(result[0]);
      document.getElementById('display1').innerHTML = this.makeTable1(result);
      document.getElementById("display").textContent = `Schedule: ${this.scheduleName}`;
    })
  }

  delete_Schedule(){
    document.getElementById('display').textContent = `Schedule ${this.scheduleName} deleted`
    this.classService.delete_Schedule(this.scheduleName).subscribe((res:any)=>{
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
  //created delete
  delete_All(){
    this.classService.deleteAll().subscribe((res:any)=>{
      console.log(res);
    }),
    error => {
      console.log("Schedules unable to be deleted")
    }
  }
//created list
  list_Schedules(){
    this.classService.list_Schedules().subscribe((res:any)=>{
      console.log(res);
      if(res.length ==0){
        document.getElementById('display').textContent = "No schedules exist"
        document.getElementById('display1').innerHTML = this.makeTable2(res);

      }
      else{
        document.getElementById('display1').innerHTML = this.makeTable(res);
      }
    
      
    })
    
  }
    
        



//format tables
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

  makeTable1(D){
    var a = '';
    var cols = Object.keys(D[0]);
    a += '<table><thead><tr>';
    for(var j=0;j<cols.length;j++) {
      a+= `<th class = "list">${cols[j]}</th>`;
    }
    a += '</tr class = "list"></thead><tbody>';
  
    for(var i=0;i<D.length; i=2) {
      a += '<tr>';
      for(j=0;j<cols.length;j++) {
        a += `<td class = "list">${D[0][cols[j]]}</td>`;
      }
      a += '</tr>';
    }
    a += '</tbody></table>';
    return a;
  }

   makeTable2(D){
    var a = '';
    var cols = Object.keys(D);
    a += '<table><thead><tr>';
    for(var j=0;j<cols.length;j++) {
      a+= `<th>${cols[j]}</th>`;
    }
    a += '</tr></thead><tbody>';
  
    for(var i=0;i<D.length; i=2) {
      a += '<tr>';
      for(j=0;j<cols.length;j++) {
        a += `<td>${D[0][cols[j]]}</td>`;
      }
      a += '</tr>';
    }
    a += '</tbody></table>';
    return a;
  }


  





  }
 




  //http:localhost:4000/api/Actursci