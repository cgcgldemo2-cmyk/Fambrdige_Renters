import { Routes } from '@angular/router';
import { RentersComponent } from './pages/renters/renters.component';
import { RenterLoginComponent } from './pages/renter-login/renter-login.component';

export const routes: Routes = [
  { path: '', component: RentersComponent },
  {
    path: 'renters/search-results',
    loadComponent: () => import('./pages/renters-search-results/renters-search-results.component')
      .then(m => m.RentersSearchResultsComponent)
  },
  {
    path: 'login',
    component:RenterLoginComponent
  },
  {
    path: 'register',
    loadComponent: () => import('./pages/renter-registration/renter-registration.component')
      .then(m => m.RenterRegistrationComponent)
  },
  { path: '**', redirectTo: 'login' }
];
