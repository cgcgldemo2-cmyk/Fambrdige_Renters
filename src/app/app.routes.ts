import { Routes } from '@angular/router';
import { VerificationCreditsComponent } from './pages/verification-credits/verification-credits.component';
import { RenterReportsComponent } from './pages/renter-reports/renter-reports.component';
import { BookingReportsComponent } from './pages/booking-reports/booking-reports.component';
import { SettingsComponent } from './pages/settings/settings.component';

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
    path: 'vehicles',
    loadComponent: () =>
      import('./pages/vehicles/vehicles.component')
        .then(m => m.VehiclesComponent)
  },
  {
    path: 'vehicles/new',
    loadComponent: () =>
      import('./pages/vehicle-form/vehicle-form.component')
        .then(m => m.VehicleFormComponent)
  },
  {
    path: 'vehicles/:id/edit',
    loadComponent: () =>
      import('./pages/vehicle-form/vehicle-form.component')
        .then(m => m.VehicleFormComponent)
  },
  {
    path: 'booking-requests',
    loadComponent: () =>
      import('./pages/booking-requests/booking-requests.component')
        .then(m => m.BookingRequestsComponent)
  },
  {
    path: 'reservation-fees',
    loadComponent: () =>
      import('./pages/reservation-fees/reservation-fees.component')
        .then(m => m.ReservationFeesComponent)
  },
  {
    path: 'renters',
    loadComponent: () =>
      import('./pages/renter-approval/renter-approval.component')
        .then(m => m.RenterApprovalComponent)
  },
  {
    path: 'api-usage',
    loadComponent: () =>
      import('./pages/api-usage/api-usage.component')
        .then(m => m.ApiUsageComponent)
  },
  {
    path: 'verification-credits',
    component: VerificationCreditsComponent
  },
  {
    path: 'reports/renters',
    component: RenterReportsComponent
  },
  {
    path: 'reports/bookings',
    component: BookingReportsComponent
  },
  {
    path: 'settings',
    component: SettingsComponent
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
