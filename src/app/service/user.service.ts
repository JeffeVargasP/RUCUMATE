import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiURL = environment.apiURL;

  constructor(private http: HttpClient) { }

  login(email: string, password: string) {
    return this.http.post(this.apiURL + 'user/login', { email, password });
  }

  register(name: string, email: string, password: string) {
    return this.http.post(this.apiURL + 'user/register', { name, email, password });
  }

}
