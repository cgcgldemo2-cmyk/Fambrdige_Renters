import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, shareReplay } from 'rxjs/operators';

export interface StripeKeys {
  clientKey: string;
  secretKey: string;
}

@Injectable({
  providedIn: 'root',
})
export class StripeService {
  private stripeKeys$: Observable<StripeKeys> | null = null;
  private readonly apiUrl = '/api/stripe/keys'; // Update with your API endpoint

  constructor(private http: HttpClient) {}

  /**
   * Fetches Stripe API keys from the backend.
   * Results are cached to avoid multiple API calls.
   */
  getStripeKeys(): Observable<StripeKeys> {
    if (!this.stripeKeys$) {
      this.stripeKeys$ = this.http.get<StripeKeys>(this.apiUrl).pipe(
        shareReplay(1), // Cache the result
        catchError((error) => {
          console.error('Failed to fetch Stripe keys:', error);
          // Return empty keys on error to allow graceful degradation
          return of({
            clientKey: '',
            secretKey: '',
          });
        })
      );
    }
    return this.stripeKeys$;
  }

  /**
   * Resets the cached keys (useful for refresh scenarios)
   */
  resetCache(): void {
    this.stripeKeys$ = null;
  }
}
