import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Western-Schedule-Maker';
  // //messages;
  // messages = this.httpClient.get<any[]>(' http://localhost:4000/api/ACTURSCI');
  // constructor(private httpClient:HttpClient){}
  //   subject:any = '';
  //  onNameKeyUp(event:any){
  //    this.subject = event.target.value;
  //   console.log(event.target.value);
  //  }

  //  getSubject(){
  //    console.log(this.subject);
  //    //this.messages = this.httpClient.get<any[]>(`http://localhost:4000/${this.subject}`);
  //  }

  }
 

