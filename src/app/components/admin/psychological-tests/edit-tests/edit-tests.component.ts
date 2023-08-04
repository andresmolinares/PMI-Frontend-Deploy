import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CookieService } from 'ngx-cookie-service';
import { PsychologicalTestsService } from 'src/app/services/psychological-tests.service';

declare var iziToast: any;

@Component({
  selector: 'edit-tests-component',
  templateUrl: './edit-tests.component.html',
  styleUrls: ['./edit-tests.component.scss']
})
export class EditarTestsComponent implements OnInit {

  public test: any = {};
  public test_types_id: any[] = [];
  public token: any = '';
  public editPruebaForm: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private _cookieService: CookieService,
    private _Servicetest: PsychologicalTestsService,
    public dialogRef: MatDialogRef<EditarTestsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.token = this._cookieService.get('token');

    this.editPruebaForm = this._formBuilder.group({
      description: new FormControl(this.data.description, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50)
      ]),
      short_description: new FormControl(this.data.short_description, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(10)
      ])
    });
  }

  ngOnInit(): void {
    
  }

  onSubmit(form: any) {
debugger;
    if (form.valid) {
      this.test = form.value;
      this.test.id = this.data.id;
      this.test.test_types_id = this.data.test_types_id;
      
      this._Servicetest.update_test(this.token, this.test.id, this.test).subscribe(
        response => {
          if (response.data) {

            this.dialogRef.close();

            iziToast.success({
              title: 'Exito',
              message: 'Prueba actualizada correctamente',
              position: 'topRight'
            });
          } else {
            console.log(response);
            iziToast.error({
              title: 'Error',
              message: 'Ha ocurrido un error al actualizar la Prueba',
              position: 'topRight'
            });
          }
        }, error => {
          console.log(error);
          iziToast.error({
            title: 'Error',
            message: 'Ha ocurrido un error al actualizar la Prueba',
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

  get description() { return this.editPruebaForm.get('description'); };
  get code() { return this.editPruebaForm.get('code'); };


}
