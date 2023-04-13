import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LoginComponent } from './login/login.component';
import { MeetBookComponent } from './meet-book/meet-book.component';
import { MeetComponent } from './meet/meet.component';
import { ScheduleComponent } from './schedule/schedule.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'join-meeting', component: MeetBookComponent },
  {
    path: '',
    component: LandingPageComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dashboard',
      },
      { path: 'schedule', component: ScheduleComponent },
      { path: 'dashboard', component: DashboardComponent },
    ],
  },
  {
    path: 'meet',
    component: MeetComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
