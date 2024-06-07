import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  apiURL = environment.apiURL;

  constructor(private http: HttpClient) { }

  getNotifications(userId: string) {
    return this.http.get(this.apiURL + 'notification');
  }

  createNotification(notification: any) {
    return this.http.post(this.apiURL + 'notification', notification);
  }

}
