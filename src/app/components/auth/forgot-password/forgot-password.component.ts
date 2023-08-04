import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from 'src/app/services/auth.service';

declare var iziToast: any;

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  public user: any = {};
  public token: any = '';
  public forgotPasswordForm: FormGroup;


  constructor(
    private _authService: AuthService,
    private _router: Router,
    private _cookieService: CookieService,
  ) {
    if (this._cookieService.check('token')) {
      this.token = this._cookieService.get('token');
    }

    this.forgotPasswordForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
    });
  }

  ngOnInit(): void {
    if (this.token) {
      this._router.navigate(['/home']);
    }
  }

  onSubmit(form: any) {
    if (form.valid) {

      this.user = form.value;
      this._authService.forgotPassword(this.user).subscribe(
        response => {
          if (response.data) {
            iziToast.success({
              title: '¡Listo!',
              message: 'Recibirá un correo electrónico con un enlace para restablecer su contraseña.', 
              position: 'topRight',
              time: 20000,
            });
          } else {
            iziToast.error({
              title: 'Error',
              message: 'Ha ocurrido un error inesperado, por favor intente nuevamente.',
              position: 'topRight'
            });
          }
        },
        error => {
          iziToast.error({
            title: 'Error',
            message: error.error.errors,
            position: 'topRight'
          });
        }
      );

    } else {
      iziToast.error({
        title: 'Error',
        message: 'Por favor, llena todos los campos',
        position: 'topRight'
      });
    }

  }

  get username() { return this.forgotPasswordForm.get('username'); }

  get email() { return this.forgotPasswordForm.get('email'); }

}
