import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2'
import { CookieService } from 'ngx-cookie-service';
import { PsychologicalProcessesService } from 'src/app/services/psychological-processes.service';
import { ActivatedRoute } from '@angular/router';
import { EditProcessComponent } from '../edit-processes/edit-process.component';

declare var iziToast: any;

@Component({
  selector: 'app-psychological-processes',
  templateUrl: './psychological-processes.component.html',
  styleUrls: ['./psychological-processes.component.scss']
})
export class PsychologicalProcessesComponent implements OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  public displayedColumns: string[] = ['id', 'description', 'max_points', 'instruction', 'actions'];
  public tests: any[] = [];
  public token: any;
  public dataSource: any;
  public testId: any;
  public dataLoading: boolean = true;

  constructor(
    private PsychologicalProcessService: PsychologicalProcessesService,
    private _dialog: MatDialog,
    private _cookieService: CookieService,
    private _activatedRoute: ActivatedRoute
  ) {
    this.token = this._cookieService.get('token');
    this._activatedRoute.params.subscribe(params => {
      this.testId = parseFloat(params['id']);
    });
    this._dialog.afterAllClosed.subscribe(
      result => {
        this.get_processes(this.testId);
      }
    );
  }

  get_processes(testId: any) {
    // debugger
    this.dataLoading = true;
    this.PsychologicalProcessService.getPsychologicalProcessesByTest(this.token, testId).subscribe(
      response => {
        this.tests = [];
        const res = response.data.filter((e: any) => e.psychological_tests_id === testId);
        for (let i = 0; i < res.length; i++) {
          this.tests[i] = {
            id: res[i].id,
            description: res[i].description,
            max_points: res[i].max_points,
            instruction: res[i].instruction
          }
        }

        this.dataSource = new MatTableDataSource(this.tests);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.dataLoading = false;
      },
      error => {
        console.log(<any>error);
        iziToast.error({
          title: 'Error',
          message: 'Error al obtener procesos',
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

  /*openCreateProcessModal() {
    this._dialog.open(NewTestsComponent, {
      width: '600px',
      height: '450px',
    });
  } */

  openEditProcessModal(process: any) {
    process.psychological_tests_id = this.testId;
    this._dialog.open(EditProcessComponent, {
      width: '600px',
      height: '650px',
      data: process
    });
  }

  deleteConfirmation(test: any) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: `¿Deseas eliminar proceso ${test.description}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#62B4F7',
      cancelButtonColor: '#F7A562',
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'No, cancelar'
    }).then((result) => {
      if (result.value) {
        //this.deleteUser(test);
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
