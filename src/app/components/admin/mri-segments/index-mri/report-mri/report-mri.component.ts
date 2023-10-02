import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { FormControl } from '@angular/forms';
import { ReportTestService } from 'src/app/services/report-test.service';
import { Chart, registerables } from 'chart.js';
import { BoxPlotController, BoxAndWiskers } from '@sgratzl/chartjs-chart-boxplot'
import { PsychologicalTestsService } from 'src/app/services/psychological-tests.service';
import { forkJoin } from 'rxjs';
import { MriService } from 'src/app/services/mri.service';
Chart.register(...registerables, BoxPlotController, BoxAndWiskers);

declare var iziToast: any;

@Component({
  selector: 'app-report-mri',
  templateUrl: './report-mri.component.html',
  styleUrls: ['./report-mri.component.scss']
})
export class ReportMriComponent implements OnInit {
  @ViewChild('canvas') canvas: ElementRef | any;
  @ViewChild('canvasBoxPlot') canvasBoxPlot: ElementRef | any;

  public description: any;
  public token: any;
  public mri_id: any;
  public maxMri: any;
  public minMri: any;
  public mriAvg: any;
  public mriMedian: any;
  public chart: any;
  public chartBoxPlot: any;
  public mriAvgE: any;
  public mriAvgC: any;
  public minMriE: any;
  public maxMriE: any;
  public minMriC: any;
  public maxMriC: any;

  public subject = new FormControl("");

  public chartType = new FormControl("2");

  constructor(
    private _cookieService: CookieService,
    private _activatedRoute: ActivatedRoute,
    private _reportMriService: MriService,
    private _mriService: MriService
  ) {
    this.token = this._cookieService.get('token');
    this._activatedRoute.params.subscribe(params => {
      this.mri_id = params['id'];
    });

    this.subject.valueChanges.subscribe((value: any) => {
      this.getReportTest(value);
    });
  }

  ngOnInit(): void {
    this.getReportTest();
  }

  ngAfterViewInit() {
    this._mriService.get_mri_by_id(this.mri_id, this.token).subscribe(
      response => {
        this.description = response.data.long_region_name;
        this.getReportTestGraphic();
      },
      error => {
        console.log(error);
      }
    );
  }

  getReportTest(is_subject = null) {
    this._reportMriService.get_report_mri(this.token, this.mri_id, is_subject).subscribe(
      response => {
        this.mriAvg = response.data.avg;
        this.maxMri = response.data.max;
        this.minMri = response.data.min;
        this.mriMedian = response.data.median;
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
    const request1$ = this._mriService.get_report_mri(this.token, this.mri_id, 1);
    const request2$ = this._mriService.get_report_mri(this.token, this.mri_id, 0);
  
    forkJoin([request1$, request2$]).subscribe(
      ([response1, response2]) => {
        //grupo de estudio
        this.mriAvgE = response1.data.avg;
        this.maxMriE = response1.data.max;
        this.minMriE = response1.data.min;
  
        // //grupo de control
        this.mriAvgC = response2.data.avg;
        this.maxMriC = response2.data.max;
        this.minMriC = response2.data.min;
  
        this.createChart();
        this.createBoxPlotChart(response1.data.volumes_mri, response2.data.volumes_mri);
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
          data: [this.maxMriE, this.minMriE, this.mriAvgE],
          borderWidth: 1
        },
        {
          label: 'Grupo control',
          data: [this.maxMriC, this.minMriC, this.mriAvgC],
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

  createBoxPlotChart(scores_test_ge: any, scores_test_gc:any) {
    this.chartBoxPlot = new Chart(this.canvasBoxPlot.nativeElement.getContext('2d'), {
      type: 'boxplot',
      data: {
        labels: ['Grupo estudio', 'Grupo control'],
        datasets: [
        {
          label: 'Grafico boxplot',
          data: [
            scores_test_ge,
            scores_test_gc
          ],
          itemRadius: 2,
          backgroundColor: [
            'rgba(255, 26, 104, 0.5)',
            'rgba(54, 162, 235, 0.5)',
          ],
          borderColor: [
            'rgba(255, 26, 104, 0.5)',
            'rgba(54, 162, 235, 0.5)',
          ],
          borderWidth: 1
        },
      ]
      },
      options: {
        scales: {
          y: {
            beginAtZero: false
          }
        }
      }
    });
  }

}
