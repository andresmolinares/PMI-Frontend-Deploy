import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { GLOBAL } from './GLOBAL';

@Injectable({
  providedIn: 'root'
})
export class MriService {

  public url;

  constructor(private _http: HttpClient) {
    this.url = GLOBAL.url+'mri/';
  }

  get_mri_tests(token:any): Observable<any> {
    let headers = new HttpHeaders({'Content-Type':'application/json', 'Authorization': token});
    return this._http.get(this.url, { headers: headers });
  }

  get_mri_by_id(id:any, token:any): Observable<any> {
    let headers = new HttpHeaders({'Content-Type':'application/json', 'Authorization': token});
    return this._http.get(this.url + `/${id}`, { headers: headers });
  }

  get_report_mri(token:any, id:any, is_subject:any): Observable<any> {
    let headers = new HttpHeaders({'Content-Type':'application/json', 'Authorization': token});
    return this._http.get(this.url + `/${id}/subject/${is_subject ? is_subject : (is_subject === 0 ? '0' : '')}`, { headers: headers });
  }
}
