import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-client';
  
  myFilter(d:any){
    if(d.toString() === "Wed Jul 13 2022 00:00:00 GMT+0300")
    return false
    return true
  }
}
