import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class ScheduleService {
  constructor(private apiService: ApiService) {}
  getAllSlots() {
    return this.apiService.get('interview/get-slots');
  }
}
