import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
  constructor(private classService: ClassServiceService){ }

  

  
  ngOnInit(){
    this.getCourses();
  }


  getCourses(){
    this.classService.getCourses().subscribe(
      data => {this.data = data},
      err => console.error(err),
      () => console.log('done loading courses')
    )
  }

  getSubject(){
    this.classService.getSubject(this.subject.toUpperCase()).subscribe((res: any) =>{
      console.log(res);
      document.getElementById('display1').innerHTML = this.makeTable(res);    
    })
  }

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

  getSubsandCourseandComp(){
    console.log(this.subject);
    console.log(this.course);
    console.log(this.component);
    this.classService.getSubsandCourseandComp(this.subject.toUpperCase(), this.course.toUpperCase(), this.component.toUpperCase()).subscribe((res:any)=>{
      var exists = 
                  res.map(function(d){
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
                  document.getElementById('display1').innerHTML = this.makeTable(exists);

       })

  }

  createSchedule(name){
    this.classService.createSchedule(name).subscribe(
      data => {
        this.getCourses();
        return true;
      },
      error => {
        console.error("Error creating schedule!");
        return Observable.throw(error);
      }
    )
  }

  makeTable(D){
    var a = '';
    var cols = Object.keys(D[0]);
    a += '<table><thead><tr>';
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
 




  //http:localhost:4000/api/Actursci