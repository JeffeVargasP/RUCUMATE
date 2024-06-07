import { HttpClient } from '@angular/common/http';
import { EnvironmentInjector, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class EspressifService {

  private apiURL = environment.apiURL;

  constructor(private http: HttpClient) { 
    EnvironmentInjector.bind(environment);
  }

  getEspressif(): Observable<any> {
    return this.http.get(this.apiURL + 'esp/data');
  }

}
