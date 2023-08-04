import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { GLOBAL } from './GLOBAL';
import { CookieService } from 'ngx-cookie-service';
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public url;

  constructor(
    private _http: HttpClient,
    private _cookieService: CookieService
  ) {
    this.url = GLOBAL.url + 'auth/';
  }

  isAuthenticated(allowRoles: string[]): boolean {
    if (!this._cookieService.check('token')) {
      return false;
    }

    const token = this._cookieService.get('token');
    
    try {
      const helper = new JwtHelperService();
      var decodedToken = helper.decodeToken(<any>token);
      
      if(helper.isTokenExpired(token)){
        this._cookieService.deleteAll();
        return false;
      }

      if (!decodedToken) {
        this._cookieService.deleteAll();
        return false;
      }

    } catch (error) {
      this._cookieService.deleteAll();
      return false;
    }

    return allowRoles.includes(decodedToken['role']);
  }

  login(data: any): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(this.url + 'login', data, { headers: headers });
  }

  register(data: any): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(this.url + 'register', data, { headers: headers });
  }

  forgotPassword(data: any): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(this.url + 'forgot_password', data, { headers: headers });
  }

  resetPassword(data: any, token:any): Observable<any> {
    let headers = new HttpHeaders({'Content-Type':'application/json', 'Authorization': token});
    return this._http.put(this.url + 'reset_password', data, { headers: headers });
  }
}
