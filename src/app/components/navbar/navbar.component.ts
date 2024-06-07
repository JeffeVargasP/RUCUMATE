import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { SessionService } from '../../service/session.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  menuOpen = false;
  constructor(private sessionService: SessionService) { }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  logout() {
    this.sessionService.clearSession();
    window.location.href = '/';
  }
}