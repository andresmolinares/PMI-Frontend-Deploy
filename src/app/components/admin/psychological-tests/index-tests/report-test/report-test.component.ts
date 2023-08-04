import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { FormControl } from '@angular/forms';
import { ReportTestService } from 'src/app/services/report-test.service';
import { Chart, registerables } from 'chart.js';
import { PsychologicalTestsService } from 'src/app/services/psychological-tests.service';
import { forkJoin } from 'rxjs';
Chart.register(...registerables);

declare var iziToast: any;

@Component({
  selector: 'app-report-test',
  templateUrl: './report-test.component.html',
  styleUrls: ['./report-test.component.scss']
})
export class ReportTestComponent implements OnInit {
  @ViewChild('canvas') canvas: ElementRef | any;

  public description: any;
  public token: any;
  public testId: any;
  public maxScore: any;
  public minScore: any;
  public testAverage: any;
  public chart: any;
  public testAverageE: any;
  public testAverageC: any;
  public minScoreE: any;
  public maxScoreE: any;
  public minScoreC: any;
  public maxScoreC: any;

  public subject = new FormControl("");

  constructor(
    private _cookieService: CookieService,
    private _activatedRoute: ActivatedRoute,
    private _reportTest: ReportTestService,
    private _psychologicalTest: PsychologicalTestsService
  ) {
    this.token = this._cookieService.get('token');
    this._activatedRoute.params.subscribe(params => {
      this.testId = params['id'];
    });

    this.subject.valueChanges.subscribe((value: any) => {
      this.getReportTest(value);
    });
  }

  ngOnInit(): void {
    this.getReportTest();
  }

  ngAfterViewInit() {
    this._psychologicalTest.getPsychologicalTest(this.testId, this.token).subscribe(
      response => {
        this.description = response.data.description;
        this.getReportTestGraphic();
      },
      error => {
        console.log(error);
      }
    );
  }

  getReportTest(is_subject = null) {
    this._reportTest.get_report_test(this.token, this.testId, is_subject).subscribe(
      response => {
        this.testAverage = response.data.test_average;
        this.maxScore = response.data.max_score;
        this.minScore = response.data.min_score;
      },
      error => {
        console.log(error);
        iziToast.error({
          title: 'Error',
          message: 'Error',
          position: 'topRight'
        });
      }
    );
  }

  getReportTestGraphic() {
    const request1$ = this._reportTest.get_report_test(this.token, this.testId, 1);
    const request2$ = this._reportTest.get_report_test(this.token, this.testId, 0);
  
    forkJoin([request1$, request2$]).subscribe(
      ([response1, response2]) => {
        //grupo de estudio
        this.testAverageE = response1.data.test_average;
        this.maxScoreE = response1.data.max_score;
        this.minScoreE = response1.data.min_score;
  
        //grupo de control
        this.testAverageC = response2.data.test_average;
        this.maxScoreC = response2.data.max_score;
        this.minScoreC = response2.data.min_score;
  
        this.createChart();
      },
      error => {
        console.log(error);
        iziToast.error({
          title: 'Error',
          message: 'Error',
          position: 'topRight'
        });
      }
    );
  }

  createChart() {
    this.chart = new Chart(this.canvas.nativeElement.getContext('2d'), {
      type: 'bar',
      data: {
        labels: ['Máximo', 'Mínimo', 'promedio'],
        datasets: [
        {
          label: 'Grupo estudio',
          data: [this.maxScoreE, this.minScoreE, this.testAverageE],
          borderWidth: 1
        },
        {
          label: 'Grupo control',
          data: [this.maxScoreC, this.minScoreC, this.testAverageC],
          borderWidth: 1
        },
      ]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
}
