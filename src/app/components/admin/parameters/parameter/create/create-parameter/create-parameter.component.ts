import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ParametersService } from 'src/app/services/parameters.service';
import { EditParameterComponent } from '../../edit/edit-parameter/edit-parameter.component';

declare var iziToast: any;

@Component({
  selector: 'create-parameter',
  templateUrl: './create-parameter.component.html',
  styleUrls: ['./create-parameter.component.scss']
})
export class CreateParameterComponent implements OnInit {

  public parameter: any = {};
  public parameterType: any[] = [];
  public token: any = '';
  public parameterTypeId: any;
  public createParameterForm: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private _cookieService: CookieService,
    private _Service: ParametersService,
    private _activatedRoute: ActivatedRoute,
    public dialogRef: MatDialogRef<EditParameterComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.token = this._cookieService.get('token');
    /*this._activatedRoute.params.subscribe(params => {
    }); */
    this.parameterTypeId = data;
    this.createParameterForm = this._formBuilder.group({
      description: new FormControl('', [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(50)
      ]),
      code: new FormControl('', [
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
      this.parameter.parameter_types_id = this.data;
      this._Service.create_parameter(this.token, this.parameter).subscribe(
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
