import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { CookieService } from 'ngx-cookie-service';
import { MriService } from 'src/app/services/mri.service';

declare var iziToast: any;

@Component({
  selector: 'app-index-mri',
  templateUrl: './index-mri.component.html',
  styleUrls: ['./index-mri.component.scss']
})
export class IndexMriComponent implements OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  public displayedColumns: string[] = ['short_region_name', 'long_region_name', 'hemisphere', 'lobe', 'actions'];
  public mri_segments: any[] = [];
  public token: any;
  public test_typeId: any;
  public dataSource: any;
  public dataLoading: boolean = true;

  constructor(
    private _mriService: MriService,
    private _cookieService: CookieService
  ) {
    this.token = this._cookieService.get('token');
    this.get_tests();
  }

  get_tests() {
    this.dataLoading = true;

    this._mriService.get_mri_tests(this.token).subscribe(
      response => {
        this.mri_segments = response.data.map((item:any) => {
          return { ...item }
        });
        console.log(this.mri_segments);
        this.dataSource = new MatTableDataSource(this.mri_segments);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.dataLoading = false;
      },
      error => {
        iziToast.error({
          title: 'Error',
          message: 'Error al obtener segmentos MRI',
          position: 'topRight'
        });
        this.dataLoading = false;
      }
    )
  }

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

}
