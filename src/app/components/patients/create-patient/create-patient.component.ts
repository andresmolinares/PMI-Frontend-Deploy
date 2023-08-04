import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from "@angular/material/dialog";
import { CookieService } from 'ngx-cookie-service';
import { InstitutionsService } from 'src/app/services/institutions.service';
import { PatientsService } from 'src/app/services/patients.service';
import { PublicService } from 'src/app/services/public.service';

declare var iziToast: any;
@Component({
  selector: 'app-create-patient',
  templateUrl: './create-patient.component.html',
  styleUrls: ['./create-patient.component.scss']
})
export class CreatePatientComponent implements OnInit {

  public createPatientForm: FormGroup;
  public departments: Array<any> = [];
  public cities: Array<any> = [];
  public institutions: Array<any> = [];
  public patient: any = {};
  public token: any;
  public btnIsLoading: boolean = false;

  constructor(
    private _formBuilder: FormBuilder,
    private _publicService: PublicService,
    private _patientService: PatientsService,
    private _cookieService: CookieService,
    private _institutionservice: InstitutionsService,
    public dialogRef: MatDialogRef<CreatePatientComponent>
  ) {
    this.token = this._cookieService.get('token');
    this.createPatientForm = this._formBuilder.group({
      id: new FormControl('', [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(20)
      ]),

      group: new FormControl('', [
        Validators.required,
      ]),

      gender: new FormControl('', [
        Validators.required,
      ]),

      first_name: new FormControl('', [
        Validators.minLength(3),
        Validators.maxLength(50)
      ]),

      age: new FormControl('', [
        Validators.required,
      ]),

      subject: new FormControl('', [
        Validators.required,
      ]),

      socioeconomic_status: new FormControl(0, [
        Validators.required,
      ]),

      schooling_level: new FormControl('', [
        Validators.required,
      ]),

      institutions_id: new FormControl(),

      study_years: new FormControl('', [
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

    this._institutionservice.get_institutions(this.token).subscribe(
      response => {
        this.institutions = response.data;
        this.institutions.sort((a, b) => {
          if (a.name < b.name) { return -1; }
          if (a.name > b.name) { return 1; }
          return 0;
        });
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
      this.patient.users_id = this._cookieService.get('id');
      this.btnIsLoading = true;

      console.log(this.patient);

      this._patientService.create_patient(this.token, this.patient).subscribe(
        response => {
          this.dialogRef.close();
          iziToast.success({
            title: 'Exito',
            message: 'Paciente creado correctamente',
            position: 'topRight'
          });
          this.btnIsLoading = false;
        },
        error => {
          console.log(error);
          iziToast.error({
            title: 'Error',
            message: error.error.errors,
            position: 'topRight'
          });
          this.btnIsLoading = false;
        }
      );
      
    }else{
      iziToast.error({
        title: 'Error',
        message: 'Por favor, completa todos los campos correctamente',
        position: 'topRight'
      });
    }
  }

  get id() { return this.createPatientForm.get('id'); }

  get subject() { return this.createPatientForm.get('subject'); }

  get group() { return this.createPatientForm.get('group'); }

  get gender() { return this.createPatientForm.get('gender'); }

  get first_name() { return this.createPatientForm.get('first_name'); }

  get age() { return this.createPatientForm.get('age'); }

  get years_study() { return this.createPatientForm.get('years_study'); }

  get study_years() { return this.createPatientForm.get('study_years'); }

  get schooling_level() { return this.createPatientForm.get('schooling_level'); }

  get socioeconomic_status() { return this.createPatientForm.get('socioeconomic_status'); }

  get institutions_id() { return this.createPatientForm.get('institutions_id'); }

}
