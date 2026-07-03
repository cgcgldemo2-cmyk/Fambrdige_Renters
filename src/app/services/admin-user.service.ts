import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenValidationResponse } from './token-validation-response.interface';
import { AdminUserType } from './admin-user-type.interface';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AdminUserService {
  private readonly baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  getUserTypes(category?: string): Observable<AdminUserType[]> {
    const url = category
      ? `${this.baseUrl}/api/landlord/user/type/${category.toLowerCase().replace(/\s+/g, '-')}`
      : `${this.baseUrl}/api/landlord/user/type`;
    return this.http.get<AdminUserType[]>(url, {
      headers: { Accept: 'application/json' }
    });
  }
  /**
   * Register a new landlord user
   * @param data { name, email, password, type }
   * @returns Observable with API response
   */
  registerUser(data: { name: string; email: string; countryCode: string; mobile: string; password: string; type: string }): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/api/landlord/user/register`, data, {
      headers: { 'Content-Type': 'application/json' }
    });
  }
  /**
   * Login landlord user
   * @param data { email, password }
   * @returns Observable with API response
   */
  loginUser(data: { email: string; password: string }): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/api/landlord/user/login`, data, {
      headers: { 'Content-Type': 'application/json' }
    });
  }
  /**
   * Get all landlord users (uses Bearer token from sessionStorage)
   * @returns Observable with API response (array or error)
   */
  getLandlordUsers(): Observable<any> {
    const token = sessionStorage.getItem('access_token') || '';
    return this.http.get<any>(`${this.baseUrl}/api/landlord/users`, {
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
  }
  /**
   * Get count of pending landlord users (uses Bearer token from sessionStorage)
   * @returns Observable with API response (count or error)
   */
  getPendingLandlordUserCount(): Observable<any> {
    const token = sessionStorage.getItem('access_token') || '';
    return this.http.get<any>(`${this.baseUrl}/api/landlord/cgic-employee-users/count`, {
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
  }
  /**
   * Validate the current landlord JWT token (from sessionStorage)
   * @returns Observable with API response (valid or error)
   */
  validateLandlordToken(): Observable<TokenValidationResponse> {
    const token = sessionStorage.getItem('access_token') || '';
    return this.http.get<TokenValidationResponse>(`${this.baseUrl}/api/landlord/token/validate`, {
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
  }

  /**
   * Get business owner user counts (pending, active, inactive, total)
   * @returns Observable with API response (counts object)
   */
  getBusinessOwnerCounts(): Observable<any> {
    const token = sessionStorage.getItem('access_token') || '';
    return this.http.get<any>(`${this.baseUrl}/api/landlord/business-owner/count`, {
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
  }

  /**
   * Enable a landlord user account
   * @param data { email }
   * @returns Observable with API response
   */
  enableUser(data: { email: string }): Observable<any> {
    const token = sessionStorage.getItem('access_token') || '';
    return this.http.post<any>(`${this.baseUrl}/api/landlord/user/enable-user`, data, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
  }
}
