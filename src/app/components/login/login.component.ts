import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../service/user.service';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Message, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { MessagesModule } from 'primeng/messages';
import { SessionService } from '../../service/session.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, ToastModule, MessagesModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  loginForm?: FormGroup | any;

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router, private sessionService: SessionService) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login(): void {

    if (this.loginForm.valid) {
      const email = this.loginForm!.get('email')!.value;
      const password = this.loginForm!.get('password')!.value;

      this.userService.login(email, password).subscribe((res: any) => {
        if (res.token) {
          this.sessionService.setSession(res);
          window.location.href = '/geral';
        }
      });
    }
  }

}
