import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-meet-book',
  templateUrl: './meet-book.component.html',
  styleUrls: ['./meet-book.component.scss'],
})
export class MeetBookComponent {
  passCode = '';
  showMeet!: boolean;
  constructor(
    private router: Router
  ) {}
  joinUserToMeet() {
    if(this.passCode){
      this.showMeet = true;
    }
  }
}
