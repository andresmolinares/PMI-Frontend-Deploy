import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from 'src/app/services/auth.service';

declare var iziToast: any;

@Component({
  selector: 'login-component',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public user: any = {};
  public token: any = '';
  public loginForm: FormGroup;
  public btnIsLoading: boolean = false;

  constructor(
    private _authService: AuthService,
    private _router: Router,
    private _cookieService: CookieService,
    private _activatedRoute: ActivatedRoute
  ) {
    if (this._cookieService.check('token')) {
      this.token = this._cookieService.get('token');
    }

    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  ngOnInit(): void {
    this.btnIsLoading = false;
    if (this.token) {
      this._router.navigate(['/PMI/home']);
    }

    this._activatedRoute.queryParams.subscribe(
      params => {
        if (params['verified'] == 'true') {
          iziToast.success({
            title: 'Correo verificado',
            message: 'Tu correo ha sido verificado correctamente, ya puedes iniciar sesión',
            position: 'topRight'
          });
        }
      });
  }

  onSubmit(form: any) {
    if (form.valid) {

      this.user = form.value;
      this.btnIsLoading = true;
      
      this._authService.login(this.user).subscribe(
        response => {
          if (response.data) {
            this._cookieService.set('token', response.data.token, 1, '/', '', true, 'Lax');
            this._cookieService.set('username', response.data.user.username, 1, '/', '', true, 'Lax');
            this._cookieService.set('id', response.data.user.id, 1, '/', '', true, 'Lax');
            this._router.navigate(['/PMI/patients']);

            iziToast.success({
              title: 'Exito',
              message: 'Has iniciado sesión correctamente',
              position: 'topRight'
            });
          } else {
            iziToast.error({
              title: 'Error',
              message: 'Usuario o contraseña incorrectos',
              position: 'topRight'
            });
          }
          this.btnIsLoading = false;
        },
        error => {
          iziToast.error({
            title: 'Error',
            message: error.error.errors,
            position: 'topRight'
          });
          this.btnIsLoading = false;
        }
      );

    } else {
      iziToast.error({
        title: 'Error',
        message: 'Usuario o contraseña incorrectos',
        position: 'topRight'
      });
    }

  }

  get username() { return this.loginForm.get('username'); }

  get password() { return this.loginForm.get('password'); }

}
