import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { CookieService } from 'ngx-cookie-service';
import { MatDialog } from '@angular/material/dialog';
import { DatasetDescriptionComponent } from '../dataset-description/dataset-description.component';

declare var iziToast: any;

@Component({
  selector: 'app-index-dataset',
  templateUrl: './index-dataset.component.html',
  styleUrls: ['./index-dataset.component.scss']
})
export class IndexDatasetComponent implements OnInit {

  public displayedColumns: string[] = ['img', 'name', 'file_type', 'created_at', 'actions'];
  public patients: any[] = [];
  public token: any;
  public dataSource: any;
  public dataLoading: boolean = true;

  constructor(
    private _cookieService: CookieService,
    public dialog: MatDialog
  ) {
    this.token = this._cookieService.get('token');
    this.get_datasets();
  }

  openDatasetDescription(dataset:any) {
    this.dialog.open(DatasetDescriptionComponent, {
      data: {
        id: dataset.id,
        name: dataset.name,
        description: dataset.description
      },
      width: '650px',
    });
  }

  get_datasets() {
    this.dataLoading = true;
    let arr = [
      {
        id: 1,
        img: 'images/datasets/dataset-cover-1.jpg',
        name: 'Cognitivas N',
        file_type: 'CSV',
        created_at: '2023-06-10',
        path: 'datasets/CognitivasN.csv',
        description: 'Conjunto de datos de pruebas cognitivas: Copia de una figura compleja, Ineco Frontal Screening, Evaluación cognitiva de Montreal, colores y palabras y fluidez verbal a jóvenes infractores de la ley y no infractores'
      },
      {
        id: 2,
        img: 'images/datasets/dataset-cover-2.png',
        name: 'MRI Mejorado',
        file_type: 'CSV',
        created_at: '2023-06-10',
        path: 'datasets/RMIMejorado.csv',
        description: 'Conjunto de datos de Pruebas de Resonancia Mangnetica a jóvenes infractores de la ley y no infractores'
      },
      {
        id: 3,
        img: 'images/datasets/dataset-cover-3.jpg',
        name: 'Sociodemograficas',
        file_type: 'CSV',
        created_at: '2023-06-10',
        path: 'datasets/Sociodemográficas.csv',
        description: 'Caracteristicas de los sujetos como genero, edad, nivel de estudios, año de estudios, tipo de familia y consumo de sustancias psicoactivas'
      },
      {
        id: 4,
        img: 'images/datasets/dataset-cover-4.jpg',
        name: 'EEG Completo',
        file_type: 'CSV',
        created_at: '2023-06-10',
        path: 'datasets/DatasetEEGCompleto.csv',
        description: 'Conjunto de datos de pruebas de electroencefalograma en Reposo a jóvenes infractores de la ley y no infractores'
      },
      {
        id: 5,
        img: 'images/datasets/dataset-cover-5.webp',
        name: 'Pruebas Completas',
        file_type: 'CSV',
        created_at: '2023-06-10',
        path: 'datasets/DatasetCompleto.csv',
        description: 'Conjunto de datos con todas las pruebas'
      }
    ];

    this.dataSource = new MatTableDataSource(arr);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataLoading = false;
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

  downloadDataset(path:any) {
    const link = document.createElement('a');
    link.href = `assets/${path}`;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

}
