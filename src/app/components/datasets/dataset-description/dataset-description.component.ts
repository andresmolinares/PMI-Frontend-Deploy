import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dataset-description',
  templateUrl: './dataset-description.component.html',
  styleUrls: ['./dataset-description.component.scss']
})
export class DatasetDescriptionComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { 
  }

  ngOnInit(): void {
  }
}
