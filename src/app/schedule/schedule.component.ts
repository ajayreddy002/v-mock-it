import { Component, OnDestroy, ViewChild, OnInit } from '@angular/core';
import {
  CalendarOptions,
  DateSelectArg,
  EventClickArg,
  EventSourceInput,
} from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import * as moment from 'moment';
import { MatDialog } from '@angular/material/dialog';
import { ScheduleCreateDialogComponent } from '../schedule-create-dialog/schedule-create-dialog.component';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ScheduleService } from '../services/schedule.service';
import { catchError, of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { SlotsResponse } from '../models/schedule-interface';
@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss'],
})
export class ScheduleComponent implements OnDestroy, OnInit {
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
    events: [],
    eventClick: this.handleEventClick.bind(this),
    select: this.handleDateSelect.bind(this),
    slotMinTime: '08:00 Am',
    initialDate: new Date(),
  };
  showScheduleDialog = false;
  constructor(
    public dialog: MatDialog,
    public dialogService: DialogService,
    private scheduleService: ScheduleService
  ) {}
  ngOnInit(): void {
    this.getSlots();
  }
  handleEventClick(clickInfo: EventClickArg) {
    console.log(clickInfo.event.title);
  }
  handleDateSelect(selectInfo: DateSelectArg) {
    this.showScheduleDialog = true;
    const selectedTime = moment(new Date(selectInfo.startStr), 'h:mma');
    const curretTime = moment(new Date(), 'h:mma');
    if (selectedTime.isAfter(curretTime)) {
      console.log('Greater');

      this.dialogRef = this.dialogService.open(ScheduleCreateDialogComponent, {
        header: `Scheduling interview on ${moment(selectInfo.startStr).format(
          'DD MMM YYYY'
        )}`,
        width: '36rem',
        contentStyle: { overflow: 'auto' },
        baseZIndex: 10000,
        maximizable: false,
        modal: true,
        data: selectInfo,
      });
    }

    this.dialogRef?.onClose.subscribe(() => {
      console.log('Dialog closed');
      this.getSlots();
    });
  }
  changeDate(event: Date) {
    this.fullcalendar?.getApi().gotoDate(moment(event).format('YYYY-MM-DD'));
  }
  getSlots() {
    this.scheduleService.getAllSlots().subscribe((data: SlotsResponse) => {
      if (data && data.slots.length > 0) {
        let events: any[] = [];
        data.slots.map((slot) => {
          events.push({
            title: 'Slot has filled',
            start: moment(slot.startTime).toISOString(),
            end: moment(slot.endTime).toISOString(),
            color: 'red',
          });
        });
        this.calendarOptions.events = events;
      }
    });
  }
  ngOnDestroy() {
    if (this.dialogRef) {
      this.dialogRef.close();
    }
  }
}
