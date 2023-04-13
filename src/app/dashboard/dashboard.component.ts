import { Component, OnInit } from '@angular/core';
import { Interview, InterviewTabLabels } from '../models/interview-model';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  interviewsData: Interview[] = [];
  tabHeaderLabels = [
    InterviewTabLabels.Upcoming,
    InterviewTabLabels.InProgress,
    InterviewTabLabels.Completed,
  ];
  constructor(private apiService: ApiService) {}
  ngOnInit() {
    console.log(this.tabHeaderLabels);
    this.apiService
      .get('interview/interviews/642402cb95e1772fa0f05c24/New')
      .subscribe((data: any) => {
        if (data && data.status === 'Success') {
          data.interviews.map((item: Interview) => {
            switch (item.status) {
              case 'New':
                item.title = InterviewTabLabels.Upcoming;
                this.interviewsData.push({ ...item });
                break;
              case 'inProgress':
                item.title = InterviewTabLabels.InProgress;
                this.interviewsData.push({ ...item });
                break;
              case 'completed':
                item.title = InterviewTabLabels.Completed;
                this.interviewsData.push({ ...item });
                break;
              default:
                break;
            }
          });
        }
        console.log(this.interviewsData)
      });
  }
}
