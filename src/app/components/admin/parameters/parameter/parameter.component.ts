import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ParametersService } from 'src/app/services/parameters.service';
import Swal from 'sweetalert2';
import { CreateParameterComponent } from './create/create-parameter/create-parameter.component';
import { EditParameterComponent } from './edit/edit-parameter/edit-parameter.component';

declare var iziToast: any;
@Component({
  selector: 'parameter-component',
  templateUrl: './parameter.component.html',
  styleUrls: ['./parameter.component.scss']
})
export class ParameterComponent implements OnInit {

  public displayedColumns: string[] = ['id', 'description', 'code', 'actions'];
  public parameters: any[] = [];
  public parameterTypeId: any;
  public dataSource: any;
  public token: any;

  constructor (
    private _Service: ParametersService,
    private _dialog: MatDialog,
    private _cookieService: CookieService,
    private _activatedRoute: ActivatedRoute
  ){
    this.token = this._cookieService.get('token');    
    this._activatedRoute.params.subscribe(params => {
      this.parameterTypeId = parseFloat(params['id']);
    });
    this._dialog.afterAllClosed.subscribe(
      result => {
        this.getParameter(this.parameterTypeId);
      }
    );
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
  }

  getParameter(parameterTypeId: any) {
    
    this._Service.get_parameters(this.token, this.parameterTypeId).subscribe(
      response => {
        const res = response.data.filter((e:any) => e.parameter_types_id === parameterTypeId)
        for (let i = 0; i < res.length; i++){
          this.parameters[i] = {
            id: res[i].id,
            description: res[i].description,
            code: res[i].code,
            parameter_types_id: res[i].parameter_types_id,
          }
        }
        
        this.dataSource = new MatTableDataSource(this.parameters);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error => {
        console.log(error);
        iziToast.error({
          title: 'Error',
          message: 'Error al obtener Parámetros',
          position: 'topRight'
        });
        console.log(<any>error);
      }
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openCreateParameterModal(parameterTypeId: any) {
    this._dialog.open(CreateParameterComponent, {
      height: '370px',
      width: '500px',
      data: parameterTypeId
    });
  }

  openEditParameterModal(parameter: any) {
    this._dialog.open(EditParameterComponent, {
      height: '370px',
      width: '500px',
      data: parameter
    });
  }

  deleteConfirmation(parameter: any) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: `¿Deseas eliminar al parámetro ${parameter.description}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '¡Sí, bórralo!'
    }).then((result) => {
      if (result.value) {
        this.deleteParameterModal(parameter);
      }
    })
  }

  deleteParameterModal(parameter: any) {
    this._Service.delete_parameter_type(this.token, parameter.id).subscribe(
      response => {
        Swal.fire(
          '¡Tipo de Parámetro eliminado!',
          'El Tipo de Parámetro ha sido eliminado correctamente.',
          'success'
        )
        this.getParameter(this.parameterTypeId);
      },
      error => {
        console.log(<any>error);
      }
    );
  }

}
