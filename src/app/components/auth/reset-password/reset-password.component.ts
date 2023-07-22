import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from 'src/app/services/auth.service';

declare var iziToast: any;


@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  public user: any = {};
  public token: any = '';
  public resetPasswordForm: FormGroup;

  constructor(
    private _authService: AuthService,
    private _router: Router,
    private _cookieService: CookieService,
    private _formBuilder: FormBuilder,
    private _route: ActivatedRoute
  ) {
    if (this._cookieService.check('token')) {
      this.token = this._cookieService.get('token');
    }

    this.resetPasswordForm = this._formBuilder.group({
      email: new FormControl('', [
        Validators.required, 
        Validators.email
      ]),

      username: new FormControl('', [
        Validators.required
      ]),
      
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(100)
      ]),

      confirm_password: new FormControl('', [
        Validators.required,
      ])

    },
    {
      validators: this.mustMatch('password', 'confirm_password')
    });
  }

  ngOnInit(): void {
    if (this.token) {
      this._router.navigate(['/home']);
    }

    this._route.params.subscribe(params => {
      this.token = params['token'];
    });
  }

  mustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors['mustMatch']) {
        // return if another validator has already found an error on the matchingControl
        return;
      }

      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    }
  }

  onSubmit(form: any) {

    if (form.valid) {

      this.user = form.value;
      this._authService.resetPassword(this.user, this.token).subscribe(
        response => {
          if (response.data) {
            iziToast.success({
              title: '¡Listo!',
              message: 'La contraseña ha sido restablecida correctamente, puede iniciar sesión.', 
              position: 'topRight',
            });

            this._router.navigate(['/']);
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

  get username() { return this.resetPasswordForm.get('username'); }

  get email() { return this.resetPasswordForm.get('email'); }

  get password() { return this.resetPasswordForm.get('password'); }

  get confirm_password() { return this.resetPasswordForm.get('confirm_password'); }

}
