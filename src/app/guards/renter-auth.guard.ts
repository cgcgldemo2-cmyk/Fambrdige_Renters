import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { RenterAuthService } from '../services/renter-auth.service';

export const renterAuthGuard: CanActivateFn = (_route, state) => {
  const authService = inject(RenterAuthService);
  const router = inject(Router);
  return authService.isAuthenticated()
    ? true
    : router.createUrlTree(['/login'], { queryParams: { returnUrl: state.url } });
};
