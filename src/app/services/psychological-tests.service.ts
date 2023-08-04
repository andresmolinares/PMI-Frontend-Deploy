import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { GLOBAL } from './GLOBAL';

@Injectable({
  providedIn: 'root'
})
export class PsychologicalTestsService {

  public url;

  constructor(private _http: HttpClient) {
    this.url = GLOBAL.url+'psychological_tests/';
  }

  getPsychologicalTests(token:any): Observable<any> {
    let headers = new HttpHeaders({'Content-Type':'application/json', 'Authorization': token});
    return this._http.get(this.url, { headers: headers });
  }

  getPsychologicalTest(id:any, token:any): Observable<any> {
    let headers = new HttpHeaders({'Content-Type':'application/json', 'Authorization': token});
    return this._http.get(this.url+id, { headers: headers });
  }

  update_test(token:any, id:any, data:any): Observable<any> {
    let headers = new HttpHeaders({'Content-Type':'application/json', 'Authorization': token});
    return this._http.put(this.url+id, data, { headers: headers });
  }

  saveTestResults(token:any, data:any): Observable<any> {
    let headers = new HttpHeaders({'Content-Type':'application/json', 'Authorization': token});
    return this._http.post(this.url+'save_results', data, { headers: headers });
  }

  getTestResults(token:any, testId:any, patientId:any): Observable<any> {
    let headers = new HttpHeaders({'Content-Type':'application/json', 'Authorization': token});
    return this._http.get(this.url+'get_results/'+testId+'/patient/'+patientId, { headers: headers });
  }

  delete_test(token:any, id:any): Observable<any> {
    let headers = new HttpHeaders({'Content-Type':'application/json', 'Authorization': token});
    return this._http.delete(this.url+id, { headers: headers });
  }

  getTestScorePatient(token:any, testId:any, patientId:any): Observable<any> {
    let headers = new HttpHeaders({'Content-Type':'application/json', 'Authorization': token});
    return this._http.get(this.url+testId+'/patient/'+patientId+'/score', { headers: headers });
  }
}
