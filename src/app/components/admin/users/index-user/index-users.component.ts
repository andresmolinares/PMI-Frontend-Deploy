import { Component, OnInit, ViewChild } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { CreateUserComponent } from '../create-user/create-user.component';
import { EditUserComponent } from '../edit-user/edit-user.component';
import Swal from 'sweetalert2'
import { CookieService } from 'ngx-cookie-service';

declare var iziToast: any;
@Component({
  selector: 'app-users',
  templateUrl: './index-users.component.html',
  styleUrls: ['./index-users.component.scss']
})
export class IndexUsersComponent implements OnInit {

  public displayedColumns: string[] = ['name', 'email', 'username', 'role', 'actions'];
  public users: string[] = [];
  public token: any;
  public dataSource: any;
  public dataLoading: boolean = true;

  constructor(
    private _usersService: UsersService,
    private _dialog: MatDialog,
    private _cookieService: CookieService
  ) {
    this.token = this._cookieService.get('token');
    this._dialog.afterAllClosed.subscribe(
      result => {
        this.get_users();
      }
    );
  }

  get_users() {
    this.dataLoading = true;
    this._usersService.get_users(this.token).subscribe(
      response => {
        this.users = response.data;
        this.dataSource = new MatTableDataSource(this.users);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.dataLoading = false;
      },
      error => {
        console.log(error);
        iziToast.error({
          title: 'Error',
          message: 'Error al obtener los usuarios',
          position: 'topRight'
        });
        console.log(<any>error);
        this.dataLoading = false;
      }
    );
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openCreateUserModal() {
    this._dialog.open(CreateUserComponent, {
      height: '600px',
      width: '600px',
    });
  }

  openEditUserModal(user: any) {
    this._dialog.open(EditUserComponent, {
      height: '470px',
      width: '600px',
      data: user
    });
  }

  deleteConfirmation(user: any) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: `¿Deseas eliminar al usuario ${user.name}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#62B4F7',
      cancelButtonColor: '#F7A562',
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'No, cancelar'
    }).then((result) => {
      if (result.value) {
        this.deleteUser(user);
      }
    })
  }

  deleteUser(user: any) {
    this._usersService.delete_user(this.token, user.id).subscribe(
      response => {
        this.get_users();
        Swal.fire(
          '¡Usuario eliminado!',
          'El usuario ha sido eliminado correctamente.',
          'success'
        )
      },
      error => {
        console.log(<any>error);
      }
    );
  }

}
