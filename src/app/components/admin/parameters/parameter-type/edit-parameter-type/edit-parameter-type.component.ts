import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CookieService } from 'ngx-cookie-service';
import { ParameterTypesService } from 'src/app/services/parameter-types.service';

declare var iziToast: any;

@Component({
  selector: 'app-edit-parameter-type',
  templateUrl: './edit-parameter-type.component.html',
  styleUrls: ['./edit-parameter-type.component.scss']
})
export class EditParameterTypeComponent implements OnInit {

  public parameterType: any = {};
  public token: any = '';
  public editParameterTypeForm: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private _cookieService: CookieService,
    private _Service: ParameterTypesService,
    public dialogRef: MatDialogRef<EditParameterTypeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.token = this._cookieService.get('token');

    this.editParameterTypeForm = this._formBuilder.group({
      description: new FormControl(this.data.description, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50)
      ])
    });
  }

  ngOnInit(): void { }

  onSubmit(form: any) {
    debugger;
    if (form.valid) {

      this.parameterType = form.value;
      this.parameterType.id = this.data.id;
      console.log(this.parameterType);
      this._Service.update_parameter_type(this.token, this.parameterType.id, this.parameterType).subscribe(
        response => {
          if (response.data) {

            this.dialogRef.close();

            iziToast.success({
              title: 'Exito',
              message: 'Tipo de Parámetro actualizado correctamente',
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

  get description() { return this.editParameterTypeForm.get('description'); }


}
