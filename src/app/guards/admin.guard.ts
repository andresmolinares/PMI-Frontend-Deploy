import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(
    private _router: Router,
    private _authService: AuthService
  ) { }

  canActivate():any{
    if (!this._authService.isAuthenticated(['administrador'])) {
      this._router.navigate(['/login']);
      return false;
    }
    return true;
  }

}


