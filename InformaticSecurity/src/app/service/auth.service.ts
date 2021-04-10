import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.prod';
import { Logi, User } from '../modals/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

apiURL = environment.apiURL;

  constructor( private http :HttpClient) { }

  register(user:User):Observable<any>{
    return this.http.post(`${this.apiURL}registro`,user );
  }

  login(user:Logi):Observable<any>{
    return this.http.post(`${this.apiURL}login`,user );
  }
  is_logged_in():boolean{
      return localStorage.getItem('token') !== null;
  }

  


}
