import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, map, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { JwtService } from './jwt.service';

export interface RenterRegistrationRequest { name: string; email: string; mobile: string; password: string; }
export interface RenterLoginRequest { email: string; password: string; }
export interface RenterAuthResult { success: boolean; message: string; }

interface RenterApiResponse {
  status?: boolean;
  success?: boolean;
  message?: string;
  token?: string;
  access_token?: string;
  data?: { token?: string; access_token?: string; renter?: unknown };
}

interface RenterApiErrorResponse { message?: string; errors?: Record<string, string[]>; }

@Injectable({ providedIn: 'root' })
export class RenterAuthService {
  private readonly registerUrl = `${environment.apiBaseUrl}${environment.renterRegisterPath}`;
  private readonly loginUrl = `${environment.apiBaseUrl}${environment.renterLoginPath}`;
  private readonly jwtService = inject(JwtService);
  private readonly authStateSubject = new BehaviorSubject<boolean>(this.hasValidToken());
  readonly authState$ = this.authStateSubject.asObservable();

  constructor(private readonly http: HttpClient) {}

  register(request: RenterRegistrationRequest): Observable<RenterAuthResult> {
    return this.http.post<RenterApiResponse>(this.registerUrl, {
      name: request.name.trim(), email: request.email.trim().toLowerCase(),
      mobile: this.normalizePhilippineMobile(request.mobile), password: request.password
    }).pipe(
      map(response => this.toResult(response, 'Registration completed.')),
      catchError(error => of({ success: false, message: this.extractApiError(error, 'Registration could not be completed.') }))
    );
  }

  login(request: RenterLoginRequest): Observable<RenterAuthResult> {
    return this.http.post<RenterApiResponse>(this.loginUrl, {
      email: request.email.trim().toLowerCase(), password: request.password
    }).pipe(
      map(response => {
        const token = response.access_token ?? response.token ?? response.data?.access_token ?? response.data?.token;
        const successful = (response.status === true || response.success === true || Boolean(token)) && Boolean(token);
        if (!successful || !token) {
          return { success: false, message: response.message?.trim() || 'The login API returned an invalid response.' };
        }
        sessionStorage.setItem('access_token', token);
        this.authStateSubject.next(true);
        return { success: true, message: response.message?.trim() || 'Login successful.' };
      }),
      catchError(error => of({ success: false, message: this.extractApiError(error, 'Login could not be completed.') }))
    );
  }

  logout(): void {
    sessionStorage.removeItem('access_token');
    this.authStateSubject.next(false);
  }

  isAuthenticated(): boolean {
    const authenticated = this.hasValidToken();
    if (authenticated !== this.authStateSubject.value) this.authStateSubject.next(authenticated);
    return authenticated;
  }

  refreshAuthState(): void {
    this.authStateSubject.next(this.hasValidToken());
  }

  private hasValidToken(): boolean {
    const token = sessionStorage.getItem('access_token');
    if (!token) return false;
    const payload = this.jwtService.decode(token);
    if (payload && typeof payload.exp === 'number' && this.jwtService.isExpired(token)) {
      sessionStorage.removeItem('access_token');
      return false;
    }
    return true;
  }

  private toResult(response: RenterApiResponse, fallback: string): RenterAuthResult {
    const success = response.status === true || response.success === true;
    return { success, message: response.message?.trim() || (success ? fallback : 'The API returned an invalid response.') };
  }

  private normalizePhilippineMobile(mobile: string): string {
    let digits = mobile.replace(/\D/g, '');
    if (digits.startsWith('63')) digits = digits.slice(2);
    if (digits.startsWith('0')) digits = digits.slice(1);
    return digits;
  }

  private extractApiError(error: unknown, fallback: string): string {
    if (!(error instanceof HttpErrorResponse)) return 'Unable to connect to the rental API. Please try again.';
    const apiError = error.error as RenterApiErrorResponse | string | null;
    if (apiError && typeof apiError === 'object') {
      const validationMessage = apiError.errors ? Object.values(apiError.errors).flat().find(message => message?.trim()) : undefined;
      if (validationMessage) return validationMessage;
      if (apiError.message?.trim()) return apiError.message.trim();
    }
    if (typeof apiError === 'string' && apiError.trim()) return apiError.trim();
    return error.status === 0 ? 'Unable to reach the rental API. Please check your connection and try again.' : fallback;
  }
}
