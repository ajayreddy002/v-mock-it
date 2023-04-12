import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { MeetBookComponent } from './meet-book/meet-book.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { CalendarComponent } from './calendar/calendar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { DialogModule } from 'primeng/dialog';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ScheduleCreateDialogComponent } from './schedule-create-dialog/schedule-create-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMatTimepickerModule } from 'ngx-mat-timepicker';
import {
  DialogService,
  DynamicDialogConfig,
  DynamicDialogModule,
} from 'primeng/dynamicdialog';
import { CardModule } from 'primeng/card';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { ToastModule } from 'primeng/toast';
import { MeetComponent } from './meet/meet.component';
import { MessageService } from 'primeng/api';
import { ApiService } from './services/api.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppInterceptor } from './http.interceptor';
const config: SocketIoConfig = { url: 'http://localhost:8008', options: {} };

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MeetBookComponent,
    SideBarComponent,
    CalendarComponent,
    DashboardComponent,
    ScheduleComponent,
    ScheduleCreateDialogComponent,
    MeetComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FullCalendarModule,
    DialogModule,
    CalendarModule,
    FormsModule,
    ReactiveFormsModule,
    DropdownModule,
    NgxMatTimepickerModule,
    DynamicDialogModule,
    CardModule,
    SocketIoModule.forRoot(config),
    ToastModule,
    HttpClientModule,
  ],
  providers: [
    DialogService,
    DynamicDialogConfig,
    MessageService,
    ApiService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AppInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
