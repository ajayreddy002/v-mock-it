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
import {DialogModule} from 'primeng/dialog';
import {CalendarModule} from 'primeng/calendar';
import {DropdownModule} from 'primeng/dropdown';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ScheduleCreateDialogComponent } from './schedule-create-dialog/schedule-create-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {NgxMatTimepickerModule} from 'ngx-mat-timepicker'; 
import { MatInputModule } from '@angular/material/input';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatChipsModule } from '@angular/material/chips';
import { DialogService, DynamicDialogConfig, DynamicDialogModule } from 'primeng/dynamicdialog';
import { CardModule } from 'primeng/card';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MeetBookComponent,
    SideBarComponent,
    CalendarComponent,
    DashboardComponent,
    ScheduleComponent,
    ScheduleCreateDialogComponent
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
    MatInputModule,
    MatAutocompleteModule,
    MatIconModule,
    MatFormFieldModule,
    MatChipsModule,
    DynamicDialogModule,
    CardModule
  ],
  providers: [
    DialogService,
    DynamicDialogConfig
    // { provide: MAT_DIALOG_DATA, useValue: {} },
    // { provide: MatDialogRef, useValue: {} }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
