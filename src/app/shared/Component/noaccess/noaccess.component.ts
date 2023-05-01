import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-noaccess',
  templateUrl: './noaccess.component.html',
  styleUrls: ['./noaccess.component.css']
})
export class NoAccessComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  
  redirectToLogin(){
    window.location.replace(environment.domDashboard)
  }

}
