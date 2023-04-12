import { Component, Input, Inject, OnInit } from '@angular/core';
import * as uuid from 'uuid';
import * as moment from 'moment';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { ApiService } from '../services/api.service';
import { catchError, of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
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
  plans = [
    {
      planName: 'Web developer',
      price: '118',
      skills: ['HTML', 'CSS', 'Javascript'],
      selected: false,
      id: 1,
    },
    {
      planName: 'Fullstack developer',
      price: '118',
      skills: ['Angular', 'Node.js', 'Mongo db'],
      selected: false,
      id: 2,
    },
    {
      planName: 'Angular developer',
      price: '118',
      skills: ['HTML', 'CSS', 'Javascript', 'Angular'],
      selected: false,
      id: 3,
    },
  ];
  selectedPlan: any;
  constructor(
    private config: DynamicDialogConfig,
    private dialogRef: DynamicDialogRef,
    private messageService: MessageService,
    private apiService: ApiService,
    private router: Router
  ) {}
  ngOnInit(): void {
    if (this.config.data) {
      this.selectedData = this.config.data;
    }
  }
  makeCardSelected(selectedPlan: any, index: number) {
    this.plans = this.plans.map((plan) => {
      if (plan.id === selectedPlan.id) {
        plan.selected = true;
        this.selectedPlan = plan;
        return plan;
      }
      plan.selected = false;
      return plan;
    });
  }
  scheduleInterview() {
    if (this.selectedPlan) {
      const formBody = {
        userId: '642402cb95e1772fa0f05c24',
        meetingId: uuid.v4(),
        skills: this.selectedPlan.skills,
        participants: ['642402cb95e1772fa0f05c24'],
        startTime: this.selectedData.start,
        endTime: this.selectedData.end,
        date: moment(this.selectedData.start).format('YYYY-MM-DD'),
        resume: 'test.pdf',
      };
      this.apiService
        .post('interview/schedule', formBody)
        .pipe(
          catchError((err: HttpErrorResponse) => {
            if (err && err.status === 403) {
              this.dialogRef.close();
              this.messageService.add({
                detail: 'You are not authorized.',
                severity: 'error',
                summary: 'Error',
              });
              setTimeout(() => {
                this.router.navigate(['login']);
              }, 1000);
            }
            this.messageService.add({
              detail: err.error.message,
              severity: 'error',
              summary: 'Error',
            });
            return of(null);
          })
        )
        .subscribe((data: any) => {
          if (data && data.status === 'Success'){
            this.messageService.add({
              detail: data.message,
              severity: 'success',
              summary: 'Interview schedule',
            });
          }
          this.dialogRef.close();
          console.log(data);
        });
    } else {
      this.messageService.add({
        detail: 'Please select a plan',
        severity: 'error',
        summary: 'Error',
      });
    }
  }
  closeDialog() {
    this.dialogRef.close();
  }
}
