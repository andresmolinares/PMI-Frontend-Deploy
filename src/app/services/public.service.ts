import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { GLOBAL } from './GLOBAL';
import { CookieService } from 'ngx-cookie-service';
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class PublicService {

  constructor(
    private _http: HttpClient
  ) { }

  get_deparments(): Observable<any> {
    let headers = new HttpHeaders({'Content-Type':'application/json', 'X-CSCAPI-KEY': 'NzhrNElJSnRwcjBYNTBzNTZnY3k4NlBRMnNEdEdQcUxic2FhWG83VA=='});
    return this._http.get(`https://api.countrystatecity.in/v1/countries/co/states`, { headers: headers });
  }

  get_cities(department_iso2:any): Observable<any> {
    let headers = new HttpHeaders({'Content-Type':'application/json', 'X-CSCAPI-KEY': 'NzhrNElJSnRwcjBYNTBzNTZnY3k4NlBRMnNEdEdQcUxic2FhWG83VA=='});
    return this._http.get(`https://api.countrystatecity.in/v1/countries/co/states/${department_iso2}/cities`, { headers: headers });
  }
}
