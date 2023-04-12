import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private httpClient: HttpClient) {}
  get(endPoint: string) {
    return this.httpClient.get(`${environment.baseAPIUrl}/${endPoint}`);
  }
  post(endPoint: string, body: any) {
    return this.httpClient.post(`${environment.baseAPIUrl}${endPoint}`, body);
  }
  put(endPoint: string, body: any, params?: any) {
    return this.httpClient.post(`${environment.baseAPIUrl}/${endPoint}`, body);
  }
}
