import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import {map} from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json',
                             'auth-token': localStorage.getItem('token') })
};




@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authUrl = "http://localhost:4000/api/user/";
  registerUrl = "http://localhost:4000/api/user/";
  publicUrl = "http://localhost:4000/api/public/";
  publicList = "http://localhost:4000/api/public/show/schedule";
  authorizeUrl = " http://localhost:4000/api/secure/";
  adminUrl = " http://localhost:4000/api/admin/";

  constructor(private http: HttpClient) { }

  

  login(model: any){

    return this.http.post(`${this.authUrl}login`,model, httpOptions)
  }

  loggedIn(){
    return !!localStorage.getItem('token');
  }

  isAdmin(){
    let jwt = localStorage.getItem('token');
    let jwtData = jwt.split('.')[1]
    let decodedJwtJsonData = window.atob(jwtData)
    let decodedJwtData = JSON.parse(decodedJwtJsonData)
    let isAdmin = decodedJwtData._role;
    if(isAdmin=== "ADMIN"){
        return true;
    }
    else return false;
  }

  userInfo(username){

    return this.http.get(`${this.adminUrl}userinfo/${username}`, httpOptions);
  }

  register(model:any){
    return this.http.post(`${this.authUrl}register`, model, httpOptions);
  }

  update(model:any){
    return this.http.post(`${this.authUrl}update`, model, httpOptions);
  }

  getCourses(){
    return this.http.get(this.publicUrl+ 'courses');
  }

  getSubject(subject){
    return this.http.get(`${this.publicUrl}${subject}`);
  }
  
  getSubsandCourse(sub,course){
    return this.http.get( `${this.publicUrl}subject/${sub}/${course}`);
  }
  
  getSubsandCourseandComp(sub,course,component){
    return this.http.get( `${this.publicUrl}subject/${sub}/${course}/?${component}`);
  }

  list_Schedules(){
    return this.http.get(`${this.publicList}`)
  }

  display(schedule){
    return this.http.get(`${this.authorizeUrl}schedules/${schedule}`)
  }
  createSchedule(schedule){
    let body = {};
    return this.http.put(this.authorizeUrl + `schedule/${schedule}`, body, httpOptions );
    //'/schedule/:name'
  }

  




}
