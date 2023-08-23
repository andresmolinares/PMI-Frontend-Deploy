import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Component, OnInit } from '@angular/core';
import { PsychologicalProcessesService } from 'src/app/services/psychological-processes.service';
import { PsychologicalTestsService } from 'src/app/services/psychological-tests.service';
import { MatDialog } from '@angular/material/dialog';
import { PatientsService } from 'src/app/services/patients.service';

declare var iziToast:any;
@Component({
  selector: 'app-cognitive-processes',
  templateUrl: './cognitive-processes.component.html',
  styleUrls: ['./cognitive-processes.component.scss']
})
export class CognitiveProcessesComponent implements OnInit {

  public patientId: any;
  public testId: any;
  public token: any;
  public test: any = {};
  public processes: Array<any> = [];
  public tasks: Array<any> = [];
  public testScore: any;
  public fetchProcesses: Array<any> = [];

  constructor(
    private _cookieService: CookieService,
    private _activatedRoute: ActivatedRoute,
    private _processesService: PsychologicalProcessesService,
    private _testsService: PsychologicalTestsService,
    private _patientsService: PatientsService,
    public dialog: MatDialog
  ) {
    console.log('Constructor called');
    this.token = this._cookieService.get('token');

    this._activatedRoute.params.subscribe(params => {
      this.patientId = params['patient'];
      this.testId = params['test'];

      this.getResultsByPatient(this.patientId);
      this.getProcessesByTest(this.testId);
      this.getTest(this.testId);
      this.getTestScorePatient();
    });
  }

  ngOnInit(): void {
  }

  getTest(id: any) {
    this._testsService.getPsychologicalTest(id, this.token).subscribe(
      response => {
        this.test = response.data;
      },
      error => {
        console.log(error);
      }
    );
  }

  getProcessesByTest(testId: any) {
    console.log('getProcessesByTest called');
    this._processesService.getPsychologicalProcessesByTest(this.token, testId).subscribe(
      response => {
        console.log('Response received');
        console.log(response.data);
        this.processes = response.data;
        for (let i = 0; i < this.processes.length; i++) {
          this.processes[i].psychological_tasks = [];
          for (let x = 0; x < this.tasks.length; x++) {
            if (this.tasks[x].psychological_processes_id === this.processes[i].id) {
              this.processes[i].psychological_tasks.push(this.tasks[x]);
            }
          }
        }
        this.fetchProcesses = this.processes;
      },
      error => {
        console.log(error);
      }
    );
  }

  getResultsByPatient(patientId:any){
    this._patientsService.get_patient_psychological_results(this.token, patientId).subscribe(
      response => {
        this.tasks = response.data.psychological_tasks;
      },
      error => {
        console.log(error);
      }
    )
  }

  getTestScorePatient(){
    this._testsService.getTestScorePatient(this.token, this.testId, this.patientId).subscribe(
      response => {
        this.testScore = response.data.score;
      },
      error => {
        console.log(error);
      }
    )
  }

  selectNext(matGroup: any) {
    matGroup.selectedIndex += 1;
  }
  
}
