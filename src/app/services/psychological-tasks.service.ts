import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { GLOBAL } from './GLOBAL';

@Injectable({
  providedIn: 'root'
})
export class PsychologicalTasksService {

  public url;

  constructor(private _http: HttpClient) {
    this.url = GLOBAL.url+'psychological_tasks/';
  }

  getPsychologicalTasks(token:any): Observable<any> {
    let headers = new HttpHeaders({'Content-Type':'application/json', 'Authorization': token});
    return this._http.get(this.url, { headers: headers });
  }

  getPsychologicalTasksByProcess(token:any, id:any): Observable<any> {
    let headers = new HttpHeaders({'Content-Type':'application/json', 'Authorization': token});
    return this._http.get(this.url+id, { headers: headers });
  }

  getPsychologicalTasksByTest(token:any, id:any): Observable<any> {
    let headers = new HttpHeaders({'Content-Type':'application/json', 'Authorization': token});
    return this._http.get(this.url+'test/'+id, { headers: headers });
  }

  update_task(token:any, id:any, data:any): Observable<any> {
    let headers = new HttpHeaders({'Content-Type':'application/json', 'Authorization': token});
    return this._http.put(this.url+id, data, { headers: headers });
  }

}
