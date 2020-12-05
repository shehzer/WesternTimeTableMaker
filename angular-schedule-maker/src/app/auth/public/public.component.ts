import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-public',
  templateUrl: './public.component.html',
  styleUrls: ['./public.component.css']
})
export class PublicComponent implements OnInit {
  public data= [];
  public subject;
  public course;
  public component;
  public scheduleName;
  public info = {};
  public list;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }




//default route , load courses
getCourses(){
  this.authService.getCourses().subscribe((res:any) => {
  document.getElementById('display1').innerHTML = this.makeTable(res);  
})
}
//get the subject
getSubject(){
  this.authService.getSubject(this.subject.toUpperCase()).subscribe((res: any) =>{
    console.log(res);
    console.log(this.data)
    document.getElementById('display1').innerHTML = this.makeTable(res);    
    console.log(this.makeTable(res));
    

  })
}
//get subs and course
getSubsandCourse(){
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
//get course and sub and component
getSubsandCourseandComp(){
  console.log(this.subject);
  console.log(this.course);
  console.log(this.component);
  this.authService.getSubsandCourseandComp(this.subject.toUpperCase(), this.course.toUpperCase(), this.component.toUpperCase()).subscribe((res:any)=>{
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
//make table
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
