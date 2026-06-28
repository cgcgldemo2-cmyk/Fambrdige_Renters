import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/lessor-login/lessor-login.component')
        .then(m => m.LessorLoginComponent)
  },
  {
    path: 'lessor-login',
    loadComponent: () =>
      import('./pages/lessor-login/lessor-login.component')
        .then(m => m.LessorLoginComponent)
  }
];
