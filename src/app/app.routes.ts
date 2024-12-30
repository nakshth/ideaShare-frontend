import { Routes } from '@angular/router';
import { RegistrationPageComponent } from './pages/registration-page/registration-page.component';
import { authGuard } from './auth.guard/auth.guard';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { InnovationManagerDashboardComponent } from './pages/innovation-manager-dashboard/innovation-manager-dashboard.component';
import { DecistionMakerDashboardComponent } from './pages/decistion-maker-dashboard/decistion-maker-dashboard.component';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginPageComponent },
  { path: 'register', component: RegistrationPageComponent },
  {
    path: 'member-dashboard',
    component: DashboardComponent,
    canActivate: [authGuard],
  },
  {
    path: 'innovation-manager-dashboard',
    component: InnovationManagerDashboardComponent,
    canActivate: [authGuard],
  },
  {
    path: 'decision-maker-dashboard',
    component: DecistionMakerDashboardComponent,
    canActivate: [authGuard],
  },
  {
    path: 'admin-dashboard',
    component: AdminDashboardComponent,
    canActivate: [authGuard],
  },
  { path: '**', redirectTo: '/login' },
];
