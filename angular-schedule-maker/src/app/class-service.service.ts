import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { FormControl, Validators } from '@angular/forms';
import { error } from 'protractor';

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
  public handleError;



  getCourses(){
    return this.http.get(this.root+ '/courses');
  }

  getSubject(subject){
    return this.http.get(`${this.root}/${subject}`);
  }
  
  getSubsandCourse(sub,course){
    return this.http.get( `${this.root}/subject/${sub}/${course}`);
  }
  
  getSubsandCourseandComp(sub,course,component){
    return this.http.get( `${this.root}/subject/${sub}/${course}/?${component}`);
  }

  createSchedule(schedule){
    let body = {};
    return this.http.put(this.root + `schedule/${schedule}`, body, httpOptions );
    //'/schedule/:name'
  }

  add_new(name:string, info:object){
    return this.http.put(`${this.root}/create/schedule/${name}`,info,httpOptions);
  }
  display(schedule){
    return this.http.get(`${this.root}/schedules/${schedule}`)
  }
  
  delete_Schedule(schedule){
    let body = {}
    return this.http.post(`${this.root}/schedules/${schedule}`,body, httpOptions)
  }
  
  deleteAll(){
    let body = {}
    return this.http.post(`${this.root}`+`deleteall/schedules`,body,httpOptions)

  }

  list_Schedules(){
    return this.http.get(`${this.root}/show/schedule`)
  }






}
