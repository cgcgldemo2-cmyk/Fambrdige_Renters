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
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];
