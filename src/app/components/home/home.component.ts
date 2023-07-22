import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'home-component',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public token: any;

  constructor(
    private _router: Router,
    private _cookieService: CookieService
  ) { 
    this.token = this._cookieService.get('token');
  }

  ngOnInit(): void {
    if (!this.token) {
      this._router.navigate(['/']);
    }
  }

}
