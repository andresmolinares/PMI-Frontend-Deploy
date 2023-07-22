import { EditPatientComponent } from './../edit-patient/edit-patient.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2'
import { CookieService } from 'ngx-cookie-service';
import { CreatePatientComponent } from '../create-patient/create-patient.component';
import { PatientsService } from 'src/app/services/patients.service';

declare var iziToast: any;
@Component({
  selector: 'app-index-patient',
  templateUrl: './index-patient.component.html',
  styleUrls: ['./index-patient.component.scss']
})
export class IndexPatientComponent implements OnInit {

  public displayedColumns: string[] = ['id', 'subject', 'group', 'age', 'study_years', 'socioeconomic_status', 'actions'];
  public patients: any[] = [];
  public token: any;
  public dataSource: any;
  public dataLoading: boolean = true;

  constructor(
    private _patientsService: PatientsService,
    private _dialog: MatDialog,
    private _cookieService: CookieService
  ) {
    this.token = this._cookieService.get('token');
    this._dialog.afterAllClosed.subscribe(
      result => {
        this.get_patients();
      }
    );
  }

  get_patients() {
    this.dataLoading = true;
    this._patientsService.get_patients(this.token).subscribe(
      response => {
        this.patients = [];
        console.log(response.data[0].first_name);
        for (let i = 0; i < response.data.length; i++) {
          if (response.data[i].first_name) {
            if (response.data[i].second_surname == null) {
              response.data[i].fullname = response.data[i].first_name + ' ' + response.data[i].first_surname;
            } else {
              response.data[i].fullname = response.data[i].first_name + ' ' + response.data[i].first_surname + ' ' + response.data[i].second_surname;
            }
          } else {
            response.data[i].fullname = 'No registrado';
          }

          this.patients[i] = {
            id: response.data[i].id,
            subject: response.data[i].subject,
            group: response.data[i].group,
            age: response.data[i].age,
            study_years: response.data[i].study_years,
            socioeconomic_status: response.data[i].socioeconomic_status,
            created_at: response.data[i].created_at,
            users_id: response.data[i].users_id,
          }
        }

        console.log(this.patients[0]);

        this.dataSource = new MatTableDataSource(this.patients);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.dataLoading = false;
      },
      error => {
        console.log(<any>error);
        iziToast.error({
          title: 'Error',
          message: 'Error al obtener los pacientes',
          position: 'topRight'
        });
        this.dataLoading = false;
      }
    );
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

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

  openCreatePatientModal() {
    this._dialog.open(CreatePatientComponent, {
      height: '805px',
      width: '600px',
    });
  }

  openEditPatientModal(patient: any) {
    patient.first_name = patient.fullname.split(' ')[0];
    patient.first_surname = patient.fullname.split(' ')[1];
    if (patient.fullname.split(' ').length > 2) {
      patient.second_surname = patient.fullname.split(' ')[2];
    }
    this._dialog.open(EditPatientComponent, {
      height: '805px',
      width: '600px',
      data: patient
    });
  }

  deleteConfirmation(patient: any) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: `¿Deseas eliminar al paciente ${patient.fullname}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#62B4F7',
      cancelButtonColor: '#F7A562',
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'No, cancelar'
    }).then((result) => {
      if (result.value) {
        this.deleteUser(patient);
      }
    })
  }

  deleteUser(user: any) {
    this._patientsService.delete_patient(this.token, user.id).subscribe(
      response => {
        Swal.fire(
          '¡Paciente eliminado!',
          'El paciente ha sido eliminado correctamente.',
          'success'
        )

        this.get_patients();
      },
      error => {
        console.log(<any>error);
      }
    );
  }

}
