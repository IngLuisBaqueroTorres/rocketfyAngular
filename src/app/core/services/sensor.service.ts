import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class SensorService {

  constructor(private http: HttpClient) { }

  // GET request method
  public getSensor(id:string): Observable<any> {
    return this.http.get<any>(environment.url +'/api/sensors/'+id);
  }
}
  

