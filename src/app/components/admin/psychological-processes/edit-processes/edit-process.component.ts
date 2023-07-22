import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CookieService } from 'ngx-cookie-service';
import { PsychologicalProcessesService } from 'src/app/services/psychological-processes.service';

declare var iziToast: any;
@Component({
  selector: 'app-edit-process',
  templateUrl: './edit-process.component.html',
  styleUrls: ['./edit-process.component.scss']
})
export class EditProcessComponent implements OnInit {

  public process: any = {};
  public token: any = '';
  public editProcessForm: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private _cookieService: CookieService,
    private _ServiceProcess: PsychologicalProcessesService,
    public dialogRef: MatDialogRef<EditProcessComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.token = this._cookieService.get('token');

    this.editProcessForm = this._formBuilder.group({
      description: new FormControl(this.data.description, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50)
      ]),
      max_points: new FormControl(this.data.max_points, [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(10)
      ]),
      instruction: new FormControl(this.data.instruction, [
        Validators.required,
        Validators.minLength(5)
      ])
    });
  }

  ngOnInit(): void {
    
  }

  onSubmit(form: any) {
    if (form.valid) {
      this.process = form.value;
      this.process.id = this.data.id;
      this.process.psychological_tests_id = this.data.psychological_tests_id;
      
      this._ServiceProcess.update_process(this.token, this.process.id, this.process).subscribe(
        response => {
          if (response.data) {

            this.dialogRef.close();

            iziToast.success({
              title: 'Exito',
              message: 'Proceso actualizado correctamente',
              position: 'topRight'
            });
          } else {
            console.log(response);
            iziToast.error({
              title: 'Error',
              message: 'Ha ocurrido un error al actualizar el proceso',
              position: 'topRight'
            });
          }
        }, error => {
          console.log(error);
          iziToast.error({
            title: 'Error',
            message: 'Ha ocurrido un error al actualizar el proceso',
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

  get description() { return this.editProcessForm.get('description'); };
  get code() { return this.editProcessForm.get('code'); };  
  get instruction() { return this.editProcessForm.get('instruction'); };

}
