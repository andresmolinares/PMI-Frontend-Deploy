import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-test-description',
  templateUrl: './test-description.component.html',
  styleUrls: ['./test-description.component.scss']
})
export class TestDescriptionComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { 
  }

  ngOnInit(): void {
  }

}
