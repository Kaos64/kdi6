import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

//import {environment} from '../../../../environments/environment';

import { Observable } from 'rxjs';
import {tap} from 'rxjs/operators'

import {Auth} from './model';
import {Login, Reset, ForgotPassword, Register} from './model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url: string = 'http://localhost:9001/app_dev.php/auth'; //environment.auth.url;

  constructor(protected http: HttpClient) { }

  public login(data: Login): Observable<Auth>{
    return this.http.post<Auth>(`${this.url}/login`, data);
  }

  public register(data:Register): Observable<Auth>{
    return this.http.post<Auth>(`${this.url}/register`, data);
  }

  public reset(data:Reset): Observable<Auth>{
    return this.http.post<Auth>(`${this.url}/reset`, data);
  }

  public forgotPassword(data:ForgotPassword): Observable<Auth>{
    return this.http.post<Auth>(`${this.url}/forgot`, data);
  }

  public refreshToken(){
  }
}
