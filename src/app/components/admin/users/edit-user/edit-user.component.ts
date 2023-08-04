import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MatDialogRef } from "@angular/material/dialog";
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CookieService } from 'ngx-cookie-service';
import { UsersService } from 'src/app/services/users.service';

declare var iziToast: any;

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

  public user: any = {};
  public token: any = '';
  public editForm: FormGroup;
  public btnIsLoading: boolean = false;

  constructor(
    private _userService: UsersService,
    private _formBuilder: FormBuilder,
    private _cookieService: CookieService,
    public dialogRef: MatDialogRef<EditUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.token = this._cookieService.get('token');

    this.editForm = this._formBuilder.group({
      name: new FormControl(this.data.name, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100)
      ]),

      role: new FormControl(this.data.role, [
        Validators.required,
      ]),

    });
  }

  ngOnInit(): void {
    this.btnIsLoading = false;
  }

  onSubmit(form: any) {

    if (form.valid) {

      this.user = form.value;

      let data = {
        name: this.user.name,
        role: this.user.role,
        username: this.data.username,
      }
      this.btnIsLoading = true;

      this._userService.update_user(this.token, this.data.id, data).subscribe(
        response => {
          if (response.data) {

            this.dialogRef.close();

            iziToast.success({
              title: 'Exito',
              message: 'Usuario actualizado correctamente',
              position: 'topRight'
            });
          } else {
            console.log(response);
            iziToast.error({
              title: 'Error',
              message: 'Ha ocurrido un error al actualizar el usuario',
              position: 'topRight'
            });
          }
          this.btnIsLoading = false;
        }, error => {
          console.log(error);
          iziToast.error({
            title: 'Error',
            message: 'Ha ocurrido un error al actualizar el usuario',
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

  get name() { return this.editForm.get('name'); }

  get role() { return this.editForm.get('role'); }

}
