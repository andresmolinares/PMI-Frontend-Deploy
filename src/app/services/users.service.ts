import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { GLOBAL } from './GLOBAL';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  public url;

  constructor(private _http: HttpClient) {
    this.url = GLOBAL.url+'users/';
  }

  get_users(token:any): Observable<any> {
    let headers = new HttpHeaders({'Content-Type':'application/json', 'Authorization': token});
    return this._http.get(this.url, { headers: headers });
  }

  update_user(token:any, id:any, data:any): Observable<any> {
    let headers = new HttpHeaders({'Content-Type':'application/json', 'Authorization': token});
    return this._http.put(this.url+id, data, { headers: headers });
  }

  delete_user(token:any, id:any): Observable<any> {
    let headers = new HttpHeaders({'Content-Type':'application/json', 'Authorization': token});
    return this._http.delete(this.url+id, { headers: headers });
  }

}
