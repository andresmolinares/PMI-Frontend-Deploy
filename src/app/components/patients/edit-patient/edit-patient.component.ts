import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MatDialogRef } from "@angular/material/dialog";
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CookieService } from 'ngx-cookie-service';
import { InstitutionsService } from 'src/app/services/institutions.service';
import { PatientsService } from 'src/app/services/patients.service';
import { PublicService } from 'src/app/services/public.service';

declare var iziToast: any;

@Component({
  selector: 'app-edit-patient',
  templateUrl: './edit-patient.component.html',
  styleUrls: ['./edit-patient.component.scss']
})
export class EditPatientComponent implements OnInit {

  public patient: any = {};
  public token: any = '';
  public editPatientForm: FormGroup;
  public departments: Array<any> = [];
  public cities: Array<any> = [];
  public institutions: Array<any> = [];
  public btnIsLoading: boolean = false;

  constructor(
    private _formBuilder: FormBuilder,
    private _cookieService: CookieService,
    private _publicService: PublicService,
    private _institutionservice: InstitutionsService,
    private _patientService: PatientsService,
    public dialogRef: MatDialogRef<EditPatientComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    console.log(data);

    if (data.fullname == "No registrado") {
      data.first_name = null;
      data.first_surname = null;
    }

    this.token = this._cookieService.get('token');

    this.editPatientForm = this._formBuilder.group({
      code: new FormControl(this.data.code, [
        Validators.required,
        Validators.maxLength(20)
      ]),
      first_name: new FormControl(this.data.first_name, [
        Validators.minLength(3),
        Validators.maxLength(50)
      ]),
      first_surname: new FormControl(this.data.first_surname, [
        Validators.minLength(3),
        Validators.maxLength(50)
      ]),
      second_surname: new FormControl(this.data.second_surname),
      birth_date: new FormControl(this.data.birth_date),
      birth_department: new FormControl(this.data.birth_department),
      birth_city: new FormControl(this.data.birth_city),
      institutions_id: new FormControl(this.data.institution.id),
      study_years: new FormControl(this.data.study_years, [
        Validators.required,
        Validators.min(0),
      ]),

    });
   }

   ngOnInit(): void {
    this.btnIsLoading = false;

    this._publicService.get_deparments().subscribe(
      response => {
        this.departments = response;
        this.departments.sort((a, b) => {
          if (a.name < b.name) { return -1; }
          if (a.name > b.name) { return 1; }
          return 0;
        });
      },
      error => {
        console.log(error);
        iziToast.error({
          title: 'Error',
          message: 'Error al obtener los departamentos',
          position: 'topRight'
        });
      }
    );

    this.get_cities(this.data.birth_department);

    this._institutionservice.get_institutions(this.token).subscribe(
      response => {
        this.institutions = response.data;
        this.institutions.sort((a, b) => {
          if (a.name < b.name) { return -1; }
          if (a.name > b.name) { return 1; }
          return 0;
        });
        console.log(this.institutions);
      },
      error => {
        console.log(error);
        iziToast.error({
          title: 'Error',
          message: 'Error al obtener los centros',
          position: 'topRight'
        });
      }
    );
  }

  onChangeDepartment(department_iso2:any) {
    this.get_cities(department_iso2);
  }

  get_cities(department_iso2:any) {
    this._publicService.get_cities(department_iso2).subscribe(
      response => {
        this.cities = response;
        this.cities.sort((a, b) => {
          if (a.name < b.name) { return -1; }
          if (a.name > b.name) { return 1; }
          return 0;
        });
      },
      error => {
        console.log(error);
        iziToast.error({
          title: 'Error',
          message: 'Error al obtener las ciudades',
          position: 'topRight'
        });
        console.log(error);
      }
    );
  }

  onSubmit(form: any) {

    if (form.valid) {

      this.patient = form.value;
      this.patient.id = this.data.id;
      this.patient.users_id = this.data.users_id;
      this.btnIsLoading = true;

      console.log(this.patient);
      
      this._patientService.update_patient(this.token, this.patient.id, this.patient).subscribe(
        response => {
          if (response.data) {

            this.dialogRef.close();

            iziToast.success({
              title: 'Exito',
              message: 'Paciente actualizado correctamente',
              position: 'topRight'
            });
          } else {
            console.log(response);
            iziToast.error({
              title: 'Error',
              message: 'Ha ocurrido un error al actualizar el paciente',
              position: 'topRight'
            });
          }
          this.btnIsLoading = false;
        }, error => {
          console.log(error);
          iziToast.error({
            title: 'Error',
            message: error.error.errors,
            position: 'topRight'
          });
          this.btnIsLoading = false;
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

  get code() { return this.editPatientForm.get('code'); }

  get first_name() { return this.editPatientForm.get('first_name'); }

  get first_surname() { return this.editPatientForm.get('first_surname'); }

  get second_surname() { return this.editPatientForm.get('second_surname'); }

  get birth_date() { return this.editPatientForm.get('birth_date'); }

  get birth_city() { return this.editPatientForm.get('birth_city'); }

  get years_study() { return this.editPatientForm.get('years_study'); }

  get study_years() { return this.editPatientForm.get('study_years'); }

  get birth_department() { return this.editPatientForm.get('birth_department'); }

  get institutions_id() { return this.editPatientForm.get('institutions_id'); }

}
