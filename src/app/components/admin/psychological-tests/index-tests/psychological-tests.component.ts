import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2'
import { CookieService } from 'ngx-cookie-service';
import { NewTestsComponent } from '../new-tests/new-tests.component';
import { EditarTestsComponent } from '../edit-tests/edit-tests.component';
import { PsychologicalTestsService } from './../../../../services/psychological-tests.service';
import { ActivatedRoute } from '@angular/router';

declare var iziToast: any;

@Component({
  selector: 'psychological-tests-component',
  templateUrl: './psychological-tests.component.html',
  styleUrls: ['./psychological-tests.component.scss']
})
export class PsychologicalTestsComponent implements OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  public displayedColumns: string[] = ['id', 'description', 'short_description', 'actions'];
  public tests: any[] = [];
  public token: any;
  public test_typeId: any;
  public dataSource: any;
  public dataLoading: boolean = true;

  constructor(
    private PsychologicalTestsService: PsychologicalTestsService,
    private _dialog: MatDialog,
    private _cookieService: CookieService
  ) {
    this.token = this._cookieService.get('token');
    this._dialog.afterAllClosed.subscribe(
      result => {
        this.get_tests();
      }
    );
  }

  get_tests() {
    this.dataLoading = true;
    this.PsychologicalTestsService.getPsychologicalTests(this.token).subscribe(
      response => {
        this.tests = [];
        for (let i = 0; i < response.data.length; i++) {
          this.tests[i] = {
            id: response.data[i].id,
            description: response.data[i].description,
            short_description: response.data[i].short_description,
            test_types_id: response.data[i].test_types_id
          };
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
          message: 'Error al obtener pruebas',
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

  openCreateTestsModal() {
    this._dialog.open(NewTestsComponent, {
      width: '600px',
      height: '450px',
    });
  }

  openEditTestsModal(test: any) {
    this._dialog.open(EditarTestsComponent, {
      width: '600px',
      height: '450px',
      data: test
    });
  }

  deleteConfirmation(test: any) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: `¿Deseas eliminar la prueba ${test.description}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#62B4F7',
      cancelButtonColor: '#F7A562',
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'No, cancelar'
    }).then((result) => {
      if (result.value) {
        this.deleteTest(test);
      }
    })
  }

  deleteTest(user: any) {
    this.PsychologicalTestsService.delete_test(this.token, user.id).subscribe(
      response => {
        Swal.fire(
          'Prueba eliminado!',
          'La prueba ha sido eliminada correctamente.',
          'success'
        )

        this.get_tests();
      },
      error => {
        console.log(<any>error);
      }
    );
  }

}
