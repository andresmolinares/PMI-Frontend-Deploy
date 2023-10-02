import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { PatientsService } from 'src/app/services/patients.service';

declare var iziToast: any;

@Component({
  selector: 'app-mri-tests',
  templateUrl: './mri-tests.component.html',
  styleUrls: ['./mri-tests.component.scss']
})

export class MriTestsComponent implements OnInit {
  public displayedColumns: string[] = ['short_region_name', 'long_region_name', 'hemisphere', 'lobe', 'volume'];
  public dataSource: any;
  public token:any;
  public patient_id:any;
  public brainStructuresMri:any;
  public dataLoading: boolean = true;

  constructor(
    private _cookieService: CookieService,
    private _patientsService: PatientsService,
    private _route: ActivatedRoute,
  ) { 
    this.token = this._cookieService.get('token');

    this._route.params.subscribe(params => {
      this.patient_id = params['id']
    });

    this.getMriTests();
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

  getMriTests() {
    this._patientsService.get_mri_tests_patient(this.token, this.patient_id).subscribe(
      response => {
        if (response.data.mris.length != 0) {
          console.log(response.data.mris);
          this.brainStructuresMri = response.data.mris[0].brain_structures;
          this.dataSource = new MatTableDataSource(this.brainStructuresMri);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.dataLoading = false;
        } else {
          this.brainStructuresMri = [];
        }
      },
      error => {
        this.dataLoading = false;
        iziToast.error({
          title: 'Error',
          message: 'Error al obtener las pruebas mri',
          position: 'topRight'
        });
      }
    )
  }
}
