import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { MatDialogRef } from "@angular/material/dialog";
import { CookieService } from 'ngx-cookie-service';

declare var iziToast: any;

@Component({
  selector: 'app-create',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {

  public user: any = {};
  public token: any = '';
  public registerForm: FormGroup;
  public btnIsLoading: boolean = false;

  constructor(
    private _authService: AuthService,
    private _formBuilder: FormBuilder,
    private _cookieService: CookieService,
    public dialogRef: MatDialogRef<CreateUserComponent>
  ) {
    this.token = this._cookieService.get('token');

    this.registerForm = this._formBuilder.group({
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100)
      ]),

      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),

      role: new FormControl('', [
        Validators.required,
      ]),

      username: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
        Validators.pattern('^[a-z0-9_]*$')
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
    this.btnIsLoading = false;
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
      this.btnIsLoading = true;

      this._authService.register(this.user).subscribe(
        response => {
          if (response.data) {
            this.dialogRef.close();

            iziToast.success({
              title: 'Exito',
              message: 'Usuario creado correctamente, se ha enviado un correo de confirmación',
              position: 'topRight'
            });
          } else {
            console.log(response);
            iziToast.error({
              title: 'Error',
              message: 'Ha ocurrido un error al crear el usuario',
              position: 'topRight'
            });
          }
          this.btnIsLoading = false;
        }, error => {
          console.log(error);
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
        message: 'Por favor, completa todos los campos correctamente',
        position: 'topRight'
      });
    }

  }

  get name() { return this.registerForm.get('name'); }

  get email() { return this.registerForm.get('email'); }

  get username() { return this.registerForm.get('username'); }

  get password() { return this.registerForm.get('password'); }

  get confirm_password() { return this.registerForm.get('confirm_password'); }

  get role() { return this.registerForm.get('role'); }

}
