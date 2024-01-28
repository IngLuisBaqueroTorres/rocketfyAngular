import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  
  constructor(private http: HttpClient) { }

  public login(nickName: string, password:string): Observable<any> {
    return this.http.post<any>(environment.url +'/api/login', {nickName, password});
  }

  public signin(name: string, nickName: string, email: string, password:string): Observable<any> {
    return this.http.post<any>(environment.url +'/api/users', {name, nickName, email, password});
  }
}
