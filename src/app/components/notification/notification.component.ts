import { Component } from '@angular/core';
import { NotificationService } from '../../service/notification.service';
import { SessionService } from '../../service/session.service';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.scss'
})
export class NotificationComponent {
  notifications: any;
  userId!: string;

  constructor(private notificationService: NotificationService, private sessionService: SessionService) { }

  ngOnInit() {
    this.sessionService.getSession().subscribe((res: any) => {
      this.userId = res.user.id;
    });

    this.notificationService.getNotifications(this.userId).subscribe((res: any) => {
      this.notifications = res;
    });
  }

}
