import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { FormControl, Validators } from '@angular/forms';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ClassServiceService {
  private root = 'http://localhost:4000/api/';
  constructor(private http: HttpClient) { }
  public data;



  getCourses(){
    return this.http.get(this.root+ '/courses');
  }

  getSubject(subject){
    return this.http.get(`${this.root}/${subject}`);
  }
  
  createSchedule(schedule){
    let body = JSON.stringify(schedule);
    return this.http.put(this.root + '/schedule/' + schedule.name, body, httpOptions );
    //'/schedule/:name'
  }

  getSubsandCourse(sub,course){
    return this.http.get( `${this.root}/subject/${sub}/${course}`);
  }
  
  getSubsandCourseandComp(sub,course,component){
    return this.http.get( `${this.root}/subject/${sub}/${course}/?${component}`);
  }

  
  







}
