import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { MeetBookComponent } from './meet-book/meet-book.component';
import { MeetComponent } from './meet/meet.component';
import { ScheduleComponent } from './schedule/schedule.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'schedule', component: MeetBookComponent },
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: 'create', component: ScheduleComponent },
      { path: 'jist', component: MeetComponent },
    ],
  },
  {
    path: 'meet', component: MeetComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
