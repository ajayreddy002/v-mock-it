import { Component, OnDestroy, ViewChild } from '@angular/core';
import {
  CalendarOptions,
  DateSelectArg,
  EventClickArg,
} from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import * as moment from 'moment';
import { MatDialog } from '@angular/material/dialog';
import { ScheduleCreateDialogComponent } from '../schedule-create-dialog/schedule-create-dialog.component';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss'],
})
export class ScheduleComponent implements OnDestroy {
  @ViewChild('fullCalendar') fullcalendar: FullCalendarComponent | undefined;
  dialogRef: DynamicDialogRef | undefined;
  calendarOptions: CalendarOptions = {
    initialView: 'timeGridDay',
    selectable: true,
    allDaySlot: false,
    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
    // businessHours: {
    //   start: '07:00 am',
    //   end: '11:00 pm'
    // },
    headerToolbar: {
      left: 'today',
      center: 'title',
      right: '',
    },
    events: [
      { title: 'event 1', date: '2023-04-01' },
      {
        title: 'event 2',
        start: moment(new Date()).toISOString(),
        end: moment(new Date()).add(2, 'hours').toISOString(),
      },
      { title: 'event 2', date: '2023-04-02' },
    ],
    eventClick: this.handleEventClick.bind(this),
    select: this.handleDateSelect.bind(this),
    slotMinTime: '08:00 Am',
    initialDate: new Date(),
  };
  showScheduleDialog = false;
  constructor(public dialog: MatDialog, public dialogService: DialogService) {}
  handleEventClick(clickInfo: EventClickArg) {
    console.log(clickInfo.event.title);
  }
  handleDateSelect(selectInfo: DateSelectArg) {
    console.log(selectInfo);
    this.showScheduleDialog = true;
    this.dialogRef = this.dialogService.open(ScheduleCreateDialogComponent, {
      header: `Scheduling interview on ${moment(selectInfo.startStr).format('DD MMM YYYY')}`,
      width: '36rem',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      maximizable: false,
      modal: true,
      data: selectInfo
    });

    this.dialogRef.onClose.subscribe(() => {
      console.log('Dialog closed');
    });
  }
  changeDate(event: Date) {
    this.fullcalendar?.getApi().gotoDate(moment(event).format('YYYY-MM-DD'));
  }
  ngOnDestroy() {
    if (this.dialogRef) {
      this.dialogRef.close();
    }
  }
}
