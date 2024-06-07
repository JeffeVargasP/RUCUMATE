import { Routes } from '@angular/router';
import { GeneralComponent } from './components/general/general.component';
import { HumidityComponent } from './components/humidity/humidity.component';
import { TemperatureComponent } from './components/temperature/temperature.component';
import { NotificationComponent } from './components/notification/notification.component';
import { LuminosityComponent } from './components/luminosity/luminosity.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'cadastrar', component: RegisterComponent },
    { path: 'login', component: LoginComponent },
    { path: 'geral', component: GeneralComponent, canActivate: [authGuard ]},
    { path: 'umidade', component: HumidityComponent, canActivate: [authGuard]},
    { path: 'temperatura', component: TemperatureComponent, canActivate: [authGuard]},
    { path: 'luminosidade', component: LuminosityComponent, canActivate: [authGuard]},
    { path: 'notificacoes', component: NotificationComponent, canActivate: [authGuard]}
];
