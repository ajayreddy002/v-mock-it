import { Component } from '@angular/core';
import { CalendarOptions, DateSelectArg, EventClickArg } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import * as moment from 'moment';
import { MatDialog } from '@angular/material/dialog';
import { ScheduleCreateDialogComponent } from '../schedule-create-dialog/schedule-create-dialog.component';
@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent {
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
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay'
    },
    events: [
      { title: 'event 1', date: '2023-04-01' },
      { title: 'event 2',start: moment(new Date()).toISOString(), end: moment(new Date()).add(2, 'hours').toISOString() },
      { title: 'event 2', date: '2023-04-02' }
    ],
    eventClick: this.handleEventClick.bind(this),
    select: this.handleDateSelect.bind(this),
    // dateClick: this.dateClick.bind(this)
  };
  showScheduleDialog = false;
  // dateClick(event: any){
  //   console.log(event, 'date click')
  // }
  constructor(
    public dialog: MatDialog
  ){}
  handleEventClick(clickInfo: EventClickArg) {
    console.log(clickInfo.event.title)
  }
  handleDateSelect(selectInfo: DateSelectArg){
    console.log(selectInfo);
    this.showScheduleDialog = true;
    const dialogRef = this.dialog.open(ScheduleCreateDialogComponent, {
      maxWidth: '50vw',
      minHeight: '500px',
      backdropClass: 'schedule-create-dialog',
      data: selectInfo
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
