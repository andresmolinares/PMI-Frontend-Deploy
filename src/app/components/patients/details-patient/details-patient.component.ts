import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { InstitutionsService } from 'src/app/services/institutions.service';
import { PatientsService } from 'src/app/services/patients.service';
import { PublicService } from 'src/app/services/public.service';
import { BreakpointObserver } from '@angular/cdk/layout';
import { StepperOrientation } from '@angular/material/stepper';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ElementRef, Renderer2, ViewChild } from '@angular/core';
import { ParametersService } from 'src/app/services/parameters.service';

declare var iziToast: any;

@Component({
  selector: 'app-details-patient',
  templateUrl: './details-patient.component.html',
  styleUrls: ['./details-patient.component.scss']
})
export class DetailsPatientComponent implements OnInit {

  public departments: Array<any> = [];
  public cities: Array<any> = [];
  public institutions: Array<any> = [];
  public patient: any = {};
  public supplData: any = {};
  public lawViolationData: any = {};
  public token: any;
  public btnIsLoading: boolean = false;
  public patientId: any;
  public user_id: any;
  public supplDataExists: any;
  public lawViolationDataExists: any;
  public parameters: Array<any> = [];

  public createPatientForm: FormGroup;
  public supplDataForm: FormGroup;
  public lawViolationForm: FormGroup;
  public crimeTypes: Array<any> = [];

  @ViewChild('asChildrenQuantity') childrenQuantityEl: ElementRef | any;
  @ViewChild('asSiblingQuantity') siblingQuantityEl: ElementRef | any;
  @ViewChild('asRecidivismQuantity') recidivismQuantityEl: ElementRef | any;

  stepperOrientation: Observable<StepperOrientation>;

  constructor(
    private _publicService: PublicService,
    private _patientService: PatientsService,
    private _cookieService: CookieService,
    private _institutionservice: InstitutionsService,
    private _route: ActivatedRoute,
    private breakPointObserver: BreakpointObserver,
    private _renderer2: Renderer2,
    private _formBuilder: FormBuilder,
    private _parameterService: ParametersService,
    private _router: Router
  ) {
    this.token = this._cookieService.get('token');

    this.createPatientForm = new FormGroup({
      id: new FormControl(null, [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(20)
      ]),

      subject: new FormControl(null, [
        Validators.required,
      ]),

      gender: new FormControl(null, [
        Validators.required,
      ]),

      orthodontic_appliance: new FormControl(null, [
      ]),

      marital_status: new FormControl(null, [
      ]),

      birth_date: new FormControl(null, [
      ]),

      institutions_id: new FormControl(null, [
      ]),

      study_years: new FormControl(null, [
        Validators.required,
        Validators.min(0),
      ]),

      schooling_level: new FormControl(null, [
        Validators.required,
      ]),

      family_type: new FormControl(null, [
      ]),

      socioeconomic_status: new FormControl(null, [
        Validators.required,
      ]),
    });

    this.lawViolationForm = this._formBuilder.group({
      sentence_months: new FormControl(null, [
      ]),

      admission_date: new FormControl(null, [
      ]),

      recidivist: new FormControl(null, [
        Validators.required,
      ]),

      recidivism_quantity: new FormControl(null, [
        Validators.min(0),
      ]),

      crime_types: this._formBuilder.array([]),
    });

    this.supplDataForm = new FormGroup({
      children: new FormControl(null),

      children_quantity: new FormControl(null, [
        Validators.min(0),
      ]),

      sibling: new FormControl(null),

      sibling_quantity: new FormControl(null, [
        Validators.min(0),
      ]),

      sibling_disciplinary_record: new FormControl(null),

      sibling_spa_use: new FormControl(null),

      gangster: new FormControl(null, [
        Validators.required,
      ]),

      spa_use: new FormControl(null, [
        Validators.required
      ]),

      smokes: new FormControl(null),

      drink_alcohol: new FormControl(null, [
        Validators.required
      ]),

      weed: new FormControl(null, [
        Validators.required
      ]),

      cocaine: new FormControl(null, [
        Validators.required
      ]),
    });

    this._route.params.subscribe(params => {
      if (params['id'] != null) {
        this.patientId = params['id'];

        this.getPatientData();

        this.getSuplData();

        this.getLawViolationData();
      } else {
        this.patient = {};
        iziToast.error({
          title: 'Error',
          message: 'Error al obtener los datos básicos del paciente',
          position: 'topRight'
        });
      }
    });

    this.stepperOrientation = breakPointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({ matches }) => (matches ? 'horizontal' : 'vertical')));
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

    this._parameterService.get_parameters_by_type(this.token, 20).subscribe(
      response => {
        this.parameters = response.data;
        this.parameters.sort((a, b) => {
          if (a.name < b.name) { return -1; }
          if (a.name > b.name) { return 1; }
          return 0;
        });
      },
      error => {
        console.log(error);
        iziToast.error({
          title: 'Error',
          message: 'Error al obtener los tipos de parámetros',
          position: 'topRight'
        });
      }
    );
    
  }

  // patient methods
  onChangeDepartment(department_iso2: any) {
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

  getPatientData() {
    this._patientService.get_patient(this.token, this.patientId).subscribe(
      response => {
        this.patient = response.data;
        this.user_id = this.patient.users_id;

        console.log(this.patient);

        this.createPatientForm.patchValue({
          id: this.patient.id,
          subject: this.patient.subject ? this.patient.subject : '',
          gender: this.patient.gender ? this.patient.gender : '',
          orthodontic_appliance: this.patient.orthodontic_appliance ? this.patient.orthodontic_appliance : '',
          marital_status: this.patient.marital_status ? this.patient.marital_status : '',
          birth_date: this.formatDate(this.patient.birth_date),
          institutions_id: this.patient.institutions_id,
          study_years: this.patient.study_years,
          schooling_level: this.patient.schooling_level ? this.patient.schooling_level : '',
          family_type: this.patient.family_type ? this.patient.family_type : '',
          socioeconomic_status: this.patient.socioeconomic_status ? this.patient.socioeconomic_status : '',
        });

      },
      error => {
        console.log(error);
        iziToast.error({
          title: 'Error',
          message: 'Error al obtener los datos básicos del paciente',
          position: 'topRight'
        });
      });
  }

  formatDate(fechaOriginal:any){
    const regex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/;

    if (regex.test(fechaOriginal)) {
      const fecha = new Date(fechaOriginal);
      const anio = fecha.getFullYear();
      const mes = String(fecha.getMonth() + 1).padStart(2, "0");
      const dia = String(fecha.getDate()).padStart(2, "0");
  
      return `${anio}-${mes}-${dia}`;
    }

    return fechaOriginal;
  }

  // supplemental data methods
  onChangeChildren(event: any) {
    const asChildrenQuantity = this.childrenQuantityEl.nativeElement;
    if (event == 0) {
      this._renderer2.setProperty(asChildrenQuantity, 'disabled', true);
      this.supplDataForm.patchValue({
        children_quantity: 0
      });
    } else if (event == 1) {
      this._renderer2.setProperty(asChildrenQuantity, 'disabled', false);
    }
  }

  onChangeSibling(event: any) {
    const asSiblingQuantity = this.siblingQuantityEl.nativeElement;
    if (event == 0) {
      this._renderer2.setProperty(asSiblingQuantity, 'disabled', true);
      this.supplDataForm.patchValue({
        sibling_quantity: 0
      });
    } else if (event == 1) {
      this._renderer2.setProperty(asSiblingQuantity, 'disabled', false);
    }
  }

  getSuplData() {
    this._patientService.get_supplemental_data_patient(this.token, this.patientId).subscribe(
      response => {
        if (response.data == null) {
          this.supplDataExists = false;
        } else if (response.data != null) {
          this.supplData = response.data;
          this.supplDataForm.patchValue(this.supplData);
          this.supplDataExists = true;
        }
      },
      error => {
        console.log(error);
        iziToast.error({
          title: 'Error',
          message: 'Error al obtener los datos complementarios del paciente',
          position: 'topRight'
        });
      });
  }

  // law violation methods
  onChangeRecidivist(event: any) {
    const asRecidivismQuantity = this.recidivismQuantityEl.nativeElement;
    if (event == 0) {
      this._renderer2.setProperty(asRecidivismQuantity, 'disabled', true);
      this.lawViolationForm.patchValue({
        recidivism_quantity: 0
      });
    } else if (event == 1) {
      this._renderer2.setProperty(asRecidivismQuantity, 'disabled', false);
    }
  }

  getLawViolationData() {
    this._patientService.get_law_violations_patient(this.token, this.patientId).subscribe(
      response => {
        if (response.data.lawViolation == null) {
          this.lawViolationDataExists = false;
          this.showCrimeTypes();
        } else if (response.data.lawViolation != null) {
          this.lawViolationData = response.data.lawViolation;
          this.lawViolationForm.patchValue(this.lawViolationData);
          this.lawViolationDataExists = true;
          this.crimeTypes = response.data.crime_types;
          this.showCrimeTypes();
        }
      },
      error => {
        console.log(error);
        iziToast.error({
          title: 'Error',
          message: 'Error al obtener los antecedentes judiciales del paciente',
          position: 'topRight'
        });
      });
  }

  showCrimeTypes() {
    if (this.lawViolationDataExists) {
      for (let i = 0; i < this.crimeTypes.length; i++) {
        this.formArrayCrimeType.push(
          this._formBuilder.group({
            crime_type: new FormControl(this.crimeTypes[i].id),
          })
        );
      }
    } else {
      this.formArrayCrimeType.push(
        this._formBuilder.group({
          crime_type: new FormControl(''),
        })
      );
    }
  }

  addCrimeTypeSelect() {
    this.formArrayCrimeType.push(
      this._formBuilder.group({
        crime_type: new FormControl(''),
      })
    );
  }

  removeCrimeTypeSelect(i: number) {
    this.formArrayCrimeType.removeAt(i);
  }

  public get formArrayCrimeType(): FormArray {
    return this.lawViolationForm.get("crime_types") as FormArray;
  }

  //submit all data
  onSubmit(lawViolationForm: any, createPatientForm: any, supplDataForm: any) {
    if (lawViolationForm.valid && createPatientForm.valid && supplDataForm.valid) {
      //basic data form
      this.patient = createPatientForm.value;
      this.patient.users_id = this.user_id;
      this.btnIsLoading = true;

      this._patientService.update_patient(this.token, this.patientId, this.patient).subscribe(
        response => {
          iziToast.success({
            title: 'Exito',
            message: 'Datos básicos guardados correctamente',
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

      //supplemental data form
      this.supplData = supplDataForm.value;
      this.supplData.children = this.supplData.children == '1' ? true : false;
      this.supplData.sibling = this.supplData.sibling == '1' ? true : false;
      this.supplData.sibling_disciplinary_record = this.supplData.sibling_disciplinary_record == '1' ? true : false;
      this.supplData.sibling_spa_use = this.supplData.sibling_spa_use == '1' ? true : false;
      this.supplData.gangster = this.supplData.gangster == '1' ? true : false;
      this.supplData.smokes = this.supplData.smokes == '1' ? true : false;
      this.supplData.spa_use = this.supplData.alcohol == '1' ? true : false;
      this.supplData.weed = this.supplData.weed == '1' ? true : false;
      this.supplData.cocaine = this.supplData.cocaine == '1' ? true : false;
      this.supplData.drink_alcohol = this.supplData.drink_alcohol == '1' ? true : false;

      this.supplData.patients_id = this.patientId;

      if (this.supplDataExists) {
        this._patientService.update_supplemental_data_patient(this.token, this.patientId, this.supplData).subscribe(
          response => {
            this.btnIsLoading = false;
            iziToast.success({
              title: 'Éxito',
              message: 'Datos complementarios del paciente actualizados',
              position: 'topRight'
            });
          },
          error => {
            this.btnIsLoading = false;
            console.log(error);
            iziToast.error({
              title: 'Error',
              message: 'Error al actualizar los datos complementarios del paciente',
              position: 'topRight'
            });
          });
      } else {
        this._patientService.create_supplemental_data_patient(this.token, this.patientId, this.supplData).subscribe(
          response => {
            this.btnIsLoading = false;
            iziToast.success({
              title: 'Éxito',
              message: 'Datos complementarios del paciente guardados',
              position: 'topRight'
            });
          },
          error => {
            this.btnIsLoading = false;
            console.log(error);
            iziToast.error({
              title: 'Error',
              message: 'Error al guardar los datos complementarios del paciente',
              position: 'topRight'
            });
          });
      }

      //law violation form
      this.lawViolationData = lawViolationForm.value;
      this.lawViolationData.recidivist = this.lawViolationData.recidivist == '1' ? true : false;
      this.lawViolationData.patients_id = this.patientId;

      if (this.lawViolationDataExists) {
        this._patientService.update_law_violations_patient(this.token, this.patientId, this.lawViolationData).subscribe(
          response => {
            this.btnIsLoading = false;
            iziToast.success({
              title: 'Éxito',
              message: 'Antecedentes judiciales del paciente actualizados',
              position: 'topRight'
            });
          },
          error => {
            this.btnIsLoading = false;
            console.log(error);
            iziToast.error({
              title: 'Error',
              message: 'Error al actualizar los antecedentes judiciales del paciente',
              position: 'topRight'
            });
          });
      } else {
        this._patientService.create_law_violations_patient(this.token, this.patientId, this.lawViolationData).subscribe(
          response => {
            this.btnIsLoading = false;
            iziToast.success({
              title: 'Éxito',
              message: 'Antecedentes judiciales del paciente guardados',
              position: 'topRight'
            });
          },
          error => {
            this.btnIsLoading = false;
            console.log(error);
            iziToast.error({
              title: 'Error',
              message: 'Error al guardar los antecedentes judiciales del paciente',
              position: 'topRight'
            });
          });
      }

    } else {
      iziToast.error({
        title: 'Error',
        message: 'Por favor, completa todos los campos correctamente',
        position: 'topRight'
      });
    }

    this._router.navigate(['/PMI/patients']);
  }

  //basic data functions
  get id() { return this.createPatientForm.get('id'); }

  get subject() { return this.createPatientForm.get('subject'); }

  get gender() { return this.createPatientForm.get('gender'); }

  get orthodontic_appliance() { return this.createPatientForm.get('orthodontic_appliance'); }

  get marital_status() { return this.createPatientForm.get('marital_status'); }

  get birth_date() { return this.createPatientForm.get('birth_date'); }

  get years_study() { return this.createPatientForm.get('years_study'); }

  get study_years() { return this.createPatientForm.get('study_years'); }

  get institutions_id() { return this.createPatientForm.get('institutions_id'); }

  get schooling_level() { return this.createPatientForm.get('schooling_level'); }

  get family_type() { return this.createPatientForm.get('family_type'); }

  get socioeconomic_status() { return this.createPatientForm.get('socioeconomic_status'); }

  // supplemental data functions
  get children() { return this.supplDataForm.get('children'); }

  get children_quantity() { return this.supplDataForm.get('children_quantity'); }

  get sibling() { return this.supplDataForm.get('sibling'); }

  get sibling_quantity() { return this.supplDataForm.get('sibling_quantity'); }

  get sibling_disciplinary_record() { return this.supplDataForm.get('sibling_disciplinary_record'); }

  get sibling_spa_use() { return this.supplDataForm.get('sibling_spa_use'); }

  get gangster() { return this.supplDataForm.get('gangster'); }

  get spa_use() { return this.lawViolationForm.get('spa_use'); }

  get smokes() { return this.lawViolationForm.get('smokes'); }

  get drink_alcohol() { return this.lawViolationForm.get('drink_alcohol'); }

  get weed() { return this.lawViolationForm.get('weed'); }

  get cocaine() { return this.lawViolationForm.get('cocaine'); }

  // law violations data functions
  get sentence_months() { return this.lawViolationForm.get('sentence_months'); }

  get admission_date() { return this.lawViolationForm.get('admission_date'); }

  get recidivist() { return this.lawViolationForm.get('recidivist'); }

  get recidivism_quantity() { return this.lawViolationForm.get('recidivism_quantity'); }

  get crime_type() { return this.lawViolationForm.get('crime_type'); }

}
