import { Routes } from '@angular/router';
import { VerificationCreditsComponent } from './pages/verification-credits/verification-credits.component';
import { RenterReportsComponent } from './pages/renter-reports/renter-reports.component';
import { BookingReportsComponent } from './pages/booking-reports/booking-reports.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { RentersComponent } from './pages/renters/renters.component';

export const routes: Routes = [
  {
    path: '',
    component: RentersComponent
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];
