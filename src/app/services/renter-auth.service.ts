import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { environment } from '../../environments/environment';

export interface RenterRegistrationRequest {
  name: string;
  email: string;
  mobile: string;
  password: string;
}

interface RenterRegistrationResponse {
  status: boolean;
  message: string;
}

interface RenterApiErrorResponse {
  message?: string;
  errors?: Record<string, string[]>;
}

export interface RenterRegistrationResult {
  success: boolean;
  message: string;
}

@Injectable({ providedIn: 'root' })
export class RenterAuthService {
  private readonly registerUrl = `${environment.apiBaseUrl}${environment.renterRegisterPath}`;

  constructor(private readonly http: HttpClient) {}

  register(request: RenterRegistrationRequest): Observable<RenterRegistrationResult> {
    return this.http.post<RenterRegistrationResponse>(this.registerUrl, {
      name: request.name.trim(),
      email: request.email.trim().toLowerCase(),
      mobile: this.normalizePhilippineMobile(request.mobile),
      password: request.password
    }).pipe(
      map(response => {
        if (response?.status !== true || typeof response.message !== 'string' || !response.message.trim()) {
          return {
            success: false,
            message: response?.message?.trim() || 'The registration API returned an invalid response.'
          };
        }

        return { success: true, message: response.message.trim() };
      }),
      catchError(error => of({ success: false, message: this.extractApiError(error) }))
    );
  }

  private normalizePhilippineMobile(mobile: string): string {
    let digits = mobile.replace(/\D/g, '');
    if (digits.startsWith('63')) {
      digits = digits.slice(2);
    }
    if (digits.startsWith('0')) {
      digits = digits.slice(1);
    }
    return digits;
  }

  private extractApiError(error: unknown): string {
    if (!(error instanceof HttpErrorResponse)) {
      return 'Unable to connect to the rental API. Please try again.';
    }

    const apiError = error.error as RenterApiErrorResponse | string | null;
    if (apiError && typeof apiError === 'object') {
      const validationMessage = apiError.errors
        ? Object.values(apiError.errors).flat().find(message => typeof message === 'string' && message.trim())
        : undefined;

      if (validationMessage) {
        return validationMessage;
      }
      if (typeof apiError.message === 'string' && apiError.message.trim()) {
        return apiError.message.trim();
      }
    }

    return error.status === 0
      ? 'Unable to reach the rental API. Please check your connection and try again.'
      : 'Registration could not be completed. Please try again.';
  }
}
