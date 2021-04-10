import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { HttpClientService } from 'src/app/service/http-client.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public component;
  public detail = true;
  user = new User();

  constructor(public router: Router, private http: HttpClientService) { }

  ngOnInit(): void {
    this.getUserInfo();
  }

  async getUserInfo(){
    this.http.makeRequest('get',environment.apiURL + 'getUser',{
      body: {}
    }).subscribe( data => {this.user = data,  console.log(data);});
  }

}
