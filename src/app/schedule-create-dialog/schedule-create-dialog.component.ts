import { Component, Input, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as moment from 'moment';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
interface Roles {
  name: string;
  code: string;
}
@Component({
  selector: 'app-schedule-create-dialog',
  templateUrl: './schedule-create-dialog.component.html',
  styleUrls: ['./schedule-create-dialog.component.scss'],
})
export class ScheduleCreateDialogComponent implements OnInit {
  @Input() display = false;
  dateAndTime: Date | undefined;
  roles = [
    {
      name: 'Software developer',
      code: 'softwareDeveloper',
    },
    {
      name: 'Full stack developer',
      code: 'fullStackDeveloper',
    },
    {
      name: 'Node.Js developer',
      code: 'nodejsDeveloper',
    },
    {
      name: 'react',
      code: 'React',
    },
    {
      name: 'angular',
      code: 'Angular',
    },
  ];
  selectedData: any;

  constructor(private config: DynamicDialogConfig) {}
  ngOnInit(): void {
    if(this.config.data){
      this.selectedData = this.config.data;
    }
    console.log(this.config.data)
  }
}
