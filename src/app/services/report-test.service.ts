import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { GLOBAL } from './GLOBAL';

@Injectable({
  providedIn: 'root'
})
export class ReportTestService {

  public url;

  constructor(private _http: HttpClient) {
    this.url = GLOBAL.url+'report_test';
  }

  get_report_test(token:any, test_id:any, is_subject:any): Observable<any> {
    let headers = new HttpHeaders({'Content-Type':'application/json', 'Authorization': token});
    return this._http.get(`${this.url}/${test_id}/subject/${is_subject ? is_subject : (is_subject === 0 ? '0' : '')}`, { headers: headers });
  }
}