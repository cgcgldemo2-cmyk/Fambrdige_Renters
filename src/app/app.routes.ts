import { Routes } from '@angular/router';
import { renterAuthGuard } from './guards/renter-auth.guard';
import { RenterLoginComponent } from './pages/renter-login/renter-login.component';
import { RentersComponent } from './pages/renters/renters.component';

export const routes: Routes = [
  { path: '', component: RentersComponent },
  {
    path: 'renters/search-results',
    loadComponent: () => import('./pages/renters-search-results/renters-search-results.component')
      .then(m => m.RentersSearchResultsComponent)
  },
  { path: 'login', component: RenterLoginComponent },
  {
    path: 'register',
    loadComponent: () => import('./pages/renter-registration/renter-registration.component')
      .then(m => m.RenterRegistrationComponent)
  },
  {
    path: 'vehicles/:id',
    loadComponent: () => import('./pages/vehicle-details/vehicle-details.component')
      .then(m => m.VehicleDetailsComponent)
  },
  {
    path: 'vehicles/:id/request',
    canActivate: [renterAuthGuard],
    loadComponent: () => import('./pages/rental-request/rental-request.component')
      .then(m => m.RentalRequestComponent)
  },
  {
    path: 'booking-confirmation/:reference',
    canActivate: [renterAuthGuard],
    loadComponent: () => import('./pages/booking-confirmation/booking-confirmation.component')
      .then(m => m.BookingConfirmationComponent)
  },
  {
    path: 'my-bookings',
    canActivate: [renterAuthGuard],
    loadComponent: () => import('./pages/my-bookings/my-bookings.component')
      .then(m => m.MyBookingsComponent)
  },
  {
    path: 'my-bookings/:reference',
    canActivate: [renterAuthGuard],
    loadComponent: () => import('./pages/booking-details/booking-details.component')
      .then(m => m.BookingDetailsComponent)
  },
  {
    path: 'my-profile',
    canActivate: [renterAuthGuard],
    loadComponent: () => import('./pages/renter-profile/renter-profile.component')
      .then(m => m.RenterProfileComponent)
  },
  {
    path: 'change-password',
    canActivate: [renterAuthGuard],
    loadComponent: () => import('./pages/change-password/change-password.component')
      .then(m => m.ChangePasswordComponent)
  },
  {
    path: 'delete-account',
    canActivate: [renterAuthGuard],
    loadComponent: () => import('./pages/delete-account-info/delete-account-info.component')
      .then(m => m.DeleteAccountInfoComponent)
  },
  { path: '**', redirectTo: '' }
];
