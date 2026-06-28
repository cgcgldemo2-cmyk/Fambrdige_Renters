import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/lessor-login/lessor-login.component')
        .then(m => m.LessorLoginComponent)
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./pages/lessor-dashboard/lessor-dashboard.component')
        .then(m => m.LessorDashboardComponent)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];
