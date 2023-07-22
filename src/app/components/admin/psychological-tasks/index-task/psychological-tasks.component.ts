import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2'
import { CookieService } from 'ngx-cookie-service';
import { PsychologicalTasksService } from 'src/app/services/psychological-tasks.service';
import { ActivatedRoute } from '@angular/router';
import { EditTaskComponent } from '../edit-task/edit-task.component';

declare var iziToast: any;

@Component({
  selector: 'app-psychological-tasks',
  templateUrl: './psychological-tasks.component.html',
  styleUrls: ['./psychological-tasks.component.scss']
})
export class PsychologicalTasksComponent implements OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  public displayedColumns: string[] = ['id', 'description', 'max_score', 'min_score', 'actions'];
  public process: any[] = [];
  public token: any;
  public dataSource: any;
  public psychological_processes_id: any;
  public dataLoading: boolean = true;

  constructor(
    private PsychologicalTasksService: PsychologicalTasksService,
    private _dialog: MatDialog,
    private _cookieService: CookieService,
    private _activatedRoute: ActivatedRoute
  ) {
    this.token = this._cookieService.get('token');
    this._activatedRoute.params.subscribe(params => {
      this.psychological_processes_id = parseFloat(params['id']);
    });
    this._dialog.afterAllClosed.subscribe(
      result => {
        this.get_processes(this.psychological_processes_id);
      }
    );
  }

  get_processes(taskId: any) {
    // debugger;
    this.dataLoading = true;
    this.PsychologicalTasksService.getPsychologicalTasksByProcess(this.token, taskId).subscribe(
      response => {
        this.process = [];
        const res = response.data.filter((e: any) => e.psychological_processes_id === taskId);
        for (let i = 0; i < res.length; i++) {
          this.process[i] = {
            id: res[i].id,
            description: res[i].description,
            max_score: res[i].max_score,
            min_score: res[i].min_score
          }
        }

        this.dataSource = new MatTableDataSource(this.process);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.dataLoading = false;
      },
      error => {
        console.log(<any>error);
        iziToast.error({
          title: 'Error',
          message: 'Error al obtener preguntas',
          position: 'topRight'
        });
        this.dataLoading = false;
      }
    );
  }

  ngOnInit(): void {
    this.dataLoading = true;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  /*openCreateTaskModal() {
    this._dialog.open(NewTaskComponent, {
      width: '600px',
      height: '450px',
    });
  } */

  openEditTaskModal(task: any) {
    task.psychological_processes_id = this.psychological_processes_id;
    this._dialog.open(EditTaskComponent, {
      width: '600px',
      height: '450px',
      data: task
    });
  }

  deleteConfirmation(task: any) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: `¿Deseas eliminar la pregunta ${task.description}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#62B4F7',
      cancelButtonColor: '#F7A562',
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'No, cancelar'
    }).then((result) => {
      if (result.value) {
        //this.deletetask(task);
      }
    })
  }

  /* deleteUser(user: any) {
    this.PsychologicalProcessService.delete_test(this.token, user.id).subscribe(
      response => {
        Swal.fire(
          '¡Paciente eliminado!',
          'El paciente ha sido eliminado correctamente.',
          'success'
        )

        this.get_processes();
      },
      error => {
        console.log(<any>error);
      }
    );
  } */

}
