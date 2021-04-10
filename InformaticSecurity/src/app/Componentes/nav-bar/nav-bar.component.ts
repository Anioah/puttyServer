import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClientService } from 'src/app/service/http-client.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
  isCollapse = true;
  toggleState() {
    let foo = this.isCollapse
    this.isCollapse = foo === false ? true : false;
  }
  loggedIn = false;
  loggedUser:any = null;
  constructor(public router:Router, private http: HttpClientService) {}

  ngOnInit(): void {
  }

  async logout(){
    this.http.makeRequest('delete',environment.apiURL + 'logout',{
      body:{}
    }).subscribe();
    this.router.navigate(['/login']);
  }
}
