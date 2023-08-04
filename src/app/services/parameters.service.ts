import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { GLOBAL } from './GLOBAL';


@Injectable({
  providedIn: 'root'
})
export class ParametersService {

  public url;

  constructor(private _http: HttpClient) {
    this.url = GLOBAL.url+'parameters/';
  }

  get_parameters(token:any, id:any): Observable<any> {
    let headers = new HttpHeaders({'Content-Type':'application/json', 'Authorization': token});
    return this._http.get(this.url, { headers: headers });
  }

  create_parameter(token:any, data:any): Observable<any> {
    let headers = new HttpHeaders({'Content-Type':'application/json', 'Authorization': token});
    return this._http.post(this.url, data, { headers: headers });
  }

  update_parameter(token:any, id:any, data:any): Observable<any> {
    let headers = new HttpHeaders({'Content-Type':'application/json', 'Authorization': token});
    return this._http.put(this.url+id, data, { headers: headers });
  }

  delete_parameter_type(token:any, id:any): Observable<any> {
    let headers = new HttpHeaders({'Content-Type':'application/json', 'Authorization': token});
    return this._http.delete(this.url+id, { headers: headers });
  }

  get_parameters_by_type(token:any, id:any): Observable<any> {
    let headers = new HttpHeaders({'Content-Type':'application/json', 'Authorization': token});
    return this._http.get(this.url+'type/'+id, { headers: headers });
  }

}
