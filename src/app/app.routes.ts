import { Routes } from '@angular/router';
import { DashboardContainerComponent } from './modules/dashboard/pages/dashboard-container/dashboard-container.component';
import { LoginComponent } from './modules/auth/pages/login/login.component';
import { ClimateContainerComponent } from './modules/dashboard/components/climate-container/climate-container.component';
import { AtmosphereContainerComponent } from './modules/dashboard/components/atmosphere-container/atmosphere-container.component';
import { MeteoContainerComponent } from './modules/dashboard/components/meteo-container/meteo-container.component';
import { SigninComponent } from './modules/auth/pages/signin/signin.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent, title: 'Login' },
    { path: 'signin', component: SigninComponent, title: 'Signin'},
    {
        path: 'dashboard', component: DashboardContainerComponent, title: 'Dashboard',
        children: [
            { path: '', redirectTo: 'climate', pathMatch: 'full'  },
            { path: 'climate', component: ClimateContainerComponent, title: 'Climate' },
            { path: 'atmosphere', component: AtmosphereContainerComponent, title: 'Atmosphere' },
            { path: 'meteorological', component: MeteoContainerComponent, title: 'Meteorological' },
        ]
    },
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: '**', redirectTo: '/login' }
];
