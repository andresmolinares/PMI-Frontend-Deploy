import { CookieService } from 'ngx-cookie-service';
import { ActivatedRoute } from '@angular/router';
import { PsychologicalTestsService } from '../../services/psychological-tests.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { TestDescriptionComponent } from './cognitive-tests/test-description/test-description.component';

@Component({
  selector: 'app-cognitive-tests',
  templateUrl: './cognitive-tests.component.html',
  styleUrls: ['./cognitive-tests.component.scss']
})
export class CognitiveTestsComponent implements OnInit {

  public displayedColumns: string[] = ['test_name', 'actions'];
  public psychologicalTests: any[] = [];
  public token: any;
  public dataSource: any;
  public dataLoading: boolean = true;
  public patientId: any;

  constructor(
    private _psychologicalTestsService: PsychologicalTestsService,
    private _activatedRoute: ActivatedRoute,
    private _cookieService: CookieService,
    public dialog: MatDialog
  ) {
    this.token = this._cookieService.get('token');
    this._activatedRoute.params.subscribe(params => {
      this.patientId = params['id'];
    });

    this._psychologicalTestsService.getPsychologicalTests(this.token).subscribe(
      response => {
        this.psychologicalTests = response.data;
        this.dataSource = new MatTableDataSource(this.psychologicalTests);
        this.dataLoading = false;
      },
      error => {
        console.log(error);
        this.dataLoading = false;
      }
    );
  }

  ngOnInit(): void {
    this.dataLoading = true;
  }

  getPsychologicalTest(id:any){

  }
  

  openTestDescription(testId:any) {
    this._psychologicalTestsService.getPsychologicalTest(testId, this.token).subscribe(
      response => {
        this.dialog.open(TestDescriptionComponent, {
          data: {
            testId: testId,
            testDescription: response.data.description
          },
          width: '650px',
        });
      },
      error => {
        console.log(error);
      }
    );
  
  }

}
