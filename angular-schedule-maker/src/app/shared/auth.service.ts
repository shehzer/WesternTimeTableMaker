import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import {map} from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authUrl = "http://localhost:4000/api/user/";
  registerUrl = "http://localhost:4000/api/user/"

  constructor(private http: HttpClient) { }

  login(model: any){

    return this.http.post(`${this.authUrl}login`,model, httpOptions)
    // return this.http.post(this.authUrl + 'login', model).pipe(
    //   map((response:any) =>{
    //     const user = response;
    //     console.log(user);
    //   })
    // )
  }

  register(model:any){
    return this.http.post(`${this.authUrl}register`, model, httpOptions);
  }




}
