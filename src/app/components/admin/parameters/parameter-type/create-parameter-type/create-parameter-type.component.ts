import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { CookieService } from 'ngx-cookie-service';
import { ParameterTypesService } from 'src/app/services/parameter-types.service';
import { EditParameterTypeComponent } from '../edit-parameter-type/edit-parameter-type.component';

declare var iziToast: any;
@Component({
  selector: 'app-create-parameter-type',
  templateUrl: './create-parameter-type.component.html',
  styleUrls: ['./create-parameter-type.component.scss']
})
export class CreateParameterTypeComponent implements OnInit {

  public parameterType: any = {};
  public token: any = '';
  public createParameterTypeForm: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private _cookieService: CookieService,
    private _Service: ParameterTypesService,
    public dialogRef: MatDialogRef<EditParameterTypeComponent>
  ) {
    this.token = this._cookieService.get('token');
    this.createParameterTypeForm = this._formBuilder.group({
      description: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50)
      ])
    });
  }

  ngOnInit(): void {
  }

  onSubmit(form: any) {
    if (form.valid) {
      this.parameterType = form.value;
      this.parameterType.users_id = this._cookieService.get('id');
      this._Service.create_parameter_type(this.token, this.parameterType).subscribe(
        response => {
          console.log(response);
          this.dialogRef.close();
          iziToast.success({
            title: 'Exito',
            message: 'Tipo de Parámetro creado correctamente',
            position: 'topRight'
          });
        },
        error => {
          console.log(error);
          iziToast.error({
            title: 'Error',
            message: error.error.errors,
            position: 'topRight'
          });
        }
      );
    }else{
      iziToast.error({
        title: 'Error',
        message: 'Por favor, completa todos los campos correctamente',
        position: 'topRight'
      });
    }
  }

}
