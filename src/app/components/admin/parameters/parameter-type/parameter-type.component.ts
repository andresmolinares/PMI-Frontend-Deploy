import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CookieService } from 'ngx-cookie-service';
import { EditParameterTypeComponent } from './edit-parameter-type/edit-parameter-type.component';
import { CreateParameterTypeComponent } from './create-parameter-type/create-parameter-type.component';
import { ParameterTypesService } from 'src/app/services/parameter-types.service';
import Swal from 'sweetalert2';

declare var iziToast: any;
@Component({
  selector: 'parameter-type-component',
  templateUrl: './parameter-type.component.html',
  styleUrls: ['./parameter-type.component.scss']
})
export class ParameterTypeComponent implements OnInit {

  public displayedColumns: string[] = ['id', 'description', 'actions'];
  public parameterType: any[] = [];
  public dataSource: any;
  public token: any;

  constructor (
    private _Service: ParameterTypesService,
    private _dialog: MatDialog,
    private _cookieService: CookieService
  ){
    this.token = this._cookieService.get('token');
    this._dialog.afterAllClosed.subscribe(
      result => {
        this.getParameterType();
      }
    );
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    
  }

  getParameterType() {
    this._Service.get_parameter_types(this.token).subscribe(
      response => {
        for (let i = 0; i < response.data.length; i++){
          this.parameterType[i] = {
            id: response.data[i].id,
            description: response.data[i].description
          }
        }

        console.log(response);
        
        this.dataSource = new MatTableDataSource(this.parameterType);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error => {
        console.log(error);
        iziToast.error({
          title: 'Error',
          message: 'Error al obtener tipos de parámetros',
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

  openCreateParameterTypeModal() {
    this._dialog.open(CreateParameterTypeComponent, {
      height: '270px',
      width: '500px',
    });
  }

  openEditParameterTypeModal(parameterType: any) {
    this._dialog.open(EditParameterTypeComponent, {
      height: '270px',
      width: '500px',
      data: parameterType
    });
  }

  deleteConfirmation(parameterType: any) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: `¿Deseas eliminar tipo de parámetro ${parameterType.description}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '¡Sí, bórralo!'
    }).then((result) => {
      if (result.value) {
        this.deleteParameterTypeModal(parameterType);
      }
    })
  }

  deleteParameterTypeModal(parameterType: any) {
    this._Service.delete_parameter_type(this.token, parameterType.id).subscribe(
      response => {
        Swal.fire(
          '¡Tipo de Parámetro eliminado!',
          'El Tipo de Parámetro ha sido eliminado correctamente.',
          'success'
        )        
        this.getParameterType();
      },
      error => {
        console.log(<any>error);
      }
    );
  }

}
