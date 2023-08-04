import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'header-component',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public username : any;

  constructor(private _cookieService: CookieService) { 
    this.username = this._cookieService.get('username');
  }

  ngOnInit(): void {
  }

}
