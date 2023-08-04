import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { GLOBAL } from './GLOBAL';

@Injectable({
  providedIn: 'root'
})
export class PatientsService {

  public url;

  constructor(private _http: HttpClient) {
    this.url = GLOBAL.url+'patients/';
  }

  get_patients(token:any): Observable<any> {
    let headers = new HttpHeaders({'Content-Type':'application/json', 'Authorization': token});
    return this._http.get(this.url, { headers: headers });
  }

  get_patient(token:any, id:any): Observable<any> {
    let headers = new HttpHeaders({'Content-Type':'application/json', 'Authorization': token});
    return this._http.get(this.url+id, { headers: headers });
  }

  create_patient(token:any, data:any): Observable<any> {
    let headers = new HttpHeaders({'Content-Type':'application/json', 'Authorization': token});
    return this._http.post(this.url, data, { headers: headers });
  }

  update_patient(token:any, id:any, data:any): Observable<any> {
    let headers = new HttpHeaders({'Content-Type':'application/json', 'Authorization': token});
    return this._http.put(this.url+id, data, { headers: headers });
  }

  delete_patient(token:any, id:any): Observable<any> {
    let headers = new HttpHeaders({'Content-Type':'application/json', 'Authorization': token});
    return this._http.delete(this.url+id, { headers: headers });
  }

  // Datos suplementarios del paciente
  get_supplemental_data_patient(token:any, id:any): Observable<any> {
    let headers = new HttpHeaders({'Content-Type':'application/json', 'Authorization': token});
    return this._http.get(this.url+id+'/supplemental_data', { headers: headers });
  }

  create_supplemental_data_patient(token:any, id:any, data:any): Observable<any> {
    let headers = new HttpHeaders({'Content-Type':'application/json', 'Authorization': token});
    return this._http.post(this.url+id+'/supplemental_data', data, { headers: headers });
  }

  update_supplemental_data_patient(token:any, id:any, data:any): Observable<any> {
    let headers = new HttpHeaders({'Content-Type':'application/json', 'Authorization': token});
    return this._http.put(this.url+id+'/supplemental_data', data, { headers: headers });
  }

  //Antecedentes judiciales del paciente
  get_law_violations_patient(token:any, id:any): Observable<any> {
    let headers = new HttpHeaders({'Content-Type':'application/json', 'Authorization': token});
    return this._http.get(this.url+id+'/law_violation', { headers: headers });
  }
  
  create_law_violations_patient(token:any, id:any, data:any): Observable<any> {
    let headers = new HttpHeaders({'Content-Type':'application/json', 'Authorization': token});
    return this._http.post(this.url+id+'/law_violation', data, { headers: headers });
  }

  update_law_violations_patient(token:any, id:any, data:any): Observable<any> {
    let headers = new HttpHeaders({'Content-Type':'application/json', 'Authorization': token});
    return this._http.put(this.url+id+'/law_violation', data, { headers: headers });
  }

  //Obtener tareas y resultados del paciente
  get_patient_psychological_results(token:any, id:any): Observable<any> {
    let headers = new HttpHeaders({'Content-Type':'application/json', 'Authorization': token});
    return this._http.get(this.url+id+'/psychological_tasks/psychological_results', { headers: headers });
  }

  //MRI del Paciente
  get_mri_tests_patient(token:any, id:any): Observable<any> {
    let headers = new HttpHeaders({'Content-Type':'application/json', 'Authorization': token});
    return this._http.get(this.url+id+'/mri_tests', { headers: headers });
  }
}
