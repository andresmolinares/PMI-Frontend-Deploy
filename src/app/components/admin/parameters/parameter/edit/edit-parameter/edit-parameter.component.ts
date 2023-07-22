import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CookieService } from 'ngx-cookie-service';
import { ParametersService } from 'src/app/services/parameters.service';
import { ParameterTypesService } from 'src/app/services/parameter-types.service';

declare var iziToast: any;

@Component({
  selector: 'app-edit-parameter',
  templateUrl: './edit-parameter.component.html',
  styleUrls: ['./edit-parameter.component.scss']
})
export class EditParameterComponent implements OnInit {

  public parameter: any = {};
  public token: any = '';
  public editParameterForm: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private _cookieService: CookieService,
    private _Service: ParametersService,
    public dialogRef: MatDialogRef<EditParameterComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.token = this._cookieService.get('token');

    this.editParameterForm = this._formBuilder.group({
      description: new FormControl(this.data.description, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50)
      ]),
      code: new FormControl(this.data.code, [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(10)
      ])
    });
  }

  ngOnInit(): void { }

  onSubmit(form: any) {
    if (form.valid) {
      this.parameter = form.value;
      this.parameter.id = this.data.id;
      this.parameter.parameter_types_id = this.data.parameter_types_id;
      console.log(this.parameter);
      this._Service.update_parameter(this.token, this.parameter.id, this.parameter).subscribe(
        response => {
          if (response.data) {

            this.dialogRef.close();

            iziToast.success({
              title: 'Exito',
              message: 'Parámetro actualizado correctamente',
              position: 'topRight'
            });
          } else {
            console.log(response);
            iziToast.error({
              title: 'Error',
              message: 'Ha ocurrido un error al actualizar el parámetro',
              position: 'topRight'
            });
          }
        }, error => {
          console.log(error);
          iziToast.error({
            title: 'Error',
            message: 'Ha ocurrido un error al actualizar el parámetro',
            position: 'topRight'
          });
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

  get description() { return this.editParameterForm.get('description'); };
  get code() { return this.editParameterForm.get('code'); };

}
