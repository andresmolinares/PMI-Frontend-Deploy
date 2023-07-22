import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CookieService } from 'ngx-cookie-service';
import { PsychologicalTasksService } from 'src/app/services/psychological-tasks.service';

declare var iziToast: any;
@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss']
})
export class EditTaskComponent implements OnInit {

  public task: any = {};
  public test_id: any[] = [];
  public token: any = '';
  public editTaskForm: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private _cookieService: CookieService,
    private _ServiceTask: PsychologicalTasksService,
    public dialogRef: MatDialogRef<EditTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.token = this._cookieService.get('token');

    this.editTaskForm = this._formBuilder.group({
      description: new FormControl(this.data.description, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50)
      ]),
      max_score: new FormControl(this.data.max_score, [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(10)
      ]),
      min_score: new FormControl(this.data.min_score, [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(10)
      ]),
    });
  }

  ngOnInit(): void {
    
  }

  onSubmit(form: any) {
debugger;
    if (form.valid) {
      this.task = form.value;
      this.task.id = this.data.id;
      this.task.psychological_processes_id = this.data.psychological_processes_id;
      
      this._ServiceTask.update_task(this.token, this.task.id, this.task).subscribe(
        response => {
          if (response.data) {

            this.dialogRef.close();

            iziToast.success({
              title: 'Exito',
              message: 'Tarea actualizada correctamente',
              position: 'topRight'
            });
          } else {
            console.log(response);
            iziToast.error({
              title: 'Error',
              message: 'Ha ocurrido un error al actualizar la tarea',
              position: 'topRight'
            });
          }
        }, error => {
          console.log(error);
          iziToast.error({
            title: 'Error',
            message: 'Ha ocurrido un error al actualizar la tarea',
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

  get description() { return this.editTaskForm.get('description'); };
  get max_score() { return this.editTaskForm.get('max_score'); };  
  get min_score() { return this.editTaskForm.get('min_score'); };

}
