import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  registerForm?: FormGroup | any;

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  register(): void {

    if (this.registerForm.valid) {
      const name = this.registerForm!.get('name')!.value;
      const email = this.registerForm!.get('email')!.value;
      const password = this.registerForm!.get('password')!.value;

      this.userService.register(name, email, password).subscribe((res: any) => {
        if (res.message === 'User created') {
          window.location.href = '/login';
        }
      });

    }
  }

}
