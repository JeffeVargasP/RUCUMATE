import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { HumidityComponent } from './humidity/humidity.component';
import { TemperatureComponent } from './temperature/temperature.component';
import { NotificationComponent } from './notification/notification.component';
import { LuminosityComponent } from './luminosity/luminosity.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AppRoutingModule } from './app.routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ChartModule } from 'primeng/chart';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GeneralComponent } from './general/general.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HumidityComponent,
    TemperatureComponent,
    NotificationComponent,
    LuminosityComponent,
    LoginComponent,
    RegisterComponent,
    GeneralComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    RouterOutlet,
    HttpClientModule,
    ChartModule,
    ToastModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
