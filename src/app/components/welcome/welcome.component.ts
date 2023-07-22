import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl} from '@angular/platform-browser'
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  welcomeImg: string = 'assets/images/welcome.jpeg';

  constructor(private router: Router) {}

  ngOnInit(): void {
  }

  login() {
    this.router.navigate(['/login']);
  }
}
