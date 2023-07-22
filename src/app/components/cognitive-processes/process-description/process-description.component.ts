import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from "@angular/material/dialog";


@Component({
  selector: 'app-process-description',
  templateUrl: './process-description.component.html',
  styleUrls: ['./process-description.component.scss']
})
export class ProcessDescriptionComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { 
    console.log(data);
  }

  ngOnInit(): void {
  }

}
