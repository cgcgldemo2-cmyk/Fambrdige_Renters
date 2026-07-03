import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of, switchMap } from 'rxjs';
import { environment } from '../../environments/environment';

export interface LocalLessorAccount {
  id: string;
  name: string;
  mobile: string;
  email: string;
  type?: string;
  typeId?: number;
  category?: string;
  categoryId?: number;
  isActive?: boolean;
  emailVerified?: boolean;
  mobileVerified?: boolean;
}

export type LocalLessorProfile = LocalLessorAccount;

export interface LocalLessorVehicle {
  id: string;
  reference?: string;
  ownerEmail: string;
  name: string;
  make: string;
  plateNumber?: string;
  motorVehicleFileNumber?: string;
  chassisNumber?: string;
  engineNumber?: string;
  color?: string;
  nextRenewalPeriod?: string;
  rentalType: string;
  location: string;
  status: 'For review' | 'Approved';
  submittedAt: string;
  seats?: string;
  transmission?: string;
  balancePaymentTiming?: 'after_approval' | 'at_handover' | '';
  withDriverSurcharge12hrs?: number;
  withDriverSurcharge24hrs?: number;
  offersDeliveryAndPickup?: boolean;
  deliveryLocationRates?: Array<{ location: string; fee: number }>;
  pickupLocationRates?: Array<{ location: string; fee: number }>;
  provinceCode?: string;
  cityMunicipalityCode?: string;
  barangayCode?: string;
  documentStatus?: 'Not submitted' | 'Submitted';
  documentsSubmittedAt?: string;
  insuranceRates?: Array<{
    coverage: string;
    rate12hrs: number | null;
    rate24hrs: number | null;
  }>;
  price12hrs?: number;
  price24hrs?: number;
  availableDates?: string[];
}

interface LessorCredentials {
  email: string;
  password: string;
}

interface LessorRegistration extends LessorCredentials {
  name: string;
  mobile: string;
}

interface ApiLessorUser {
  id: number | string;
  name: string;
  mobile: string;
  email: string;
  type?: string;
  type_id?: number;
  category?: string;
  category_id?: number;
  access_type?: string;
  is_active?: boolean;
  email_verified_at?: string | null;
  mobile_verified_at?: string | null;
  email_verified?: boolean;
  mobile_verified?: boolean;
}

interface LoginResponse {
  token: string;
  token_type: string;
  expires_in: number;
  user: ApiLessorUser;
}

interface RegisterResponse {
  status: boolean;
  message: string;
}

interface ApiVehicle {
  id: number | string;
  reference: string;
  make: string;
  name: string;
  plate_number?: string;
  motor_vehicle_file_number?: string;
  chassis_number?: string;
  engine_number?: string;
  color?: string;
  next_renewal_period?: string;
  seats: string;
  transmission: string;
  rental_type: string;
  balance_payment_timing: 'after_approval' | 'at_handover';
  with_driver_surcharge_12hrs: number;
  with_driver_surcharge_24hrs: number;
  offers_delivery_and_pickup: boolean;
  delivery_location_rates?: Array<{ location: string; fee: number }>;
  pickup_location_rates?: Array<{ location: string; fee: number }>;
  location: string;
  province_code?: string;
  city_municipality_code?: string;
  barangay_code?: string;
  status: 'for_review' | 'approved';
  document_status: 'not_submitted' | 'submitted';
  price_12hrs?: number;
  price_24hrs?: number;
  available_dates?: string[];
  submitted_at: string;
}

interface VehicleListResponse {
  vehicles: ApiVehicle[];
}

interface VehicleResponse {
  message: string;
  vehicle: ApiVehicle;
}

interface ProfileResponse {
  message?: string;
  user: ApiLessorUser;
}

interface VerificationResponse {
  message: string;
  user?: ApiLessorUser;
  demo_code?: string;
  authorization_token?: string;
}

export interface LessorVehicleResult {
  success: boolean;
  message: string;
  vehicle?: LocalLessorVehicle;
}

export interface VehicleHoliday {
  id: number;
  starts_at: string;
  ends_at: string;
  reason: string | null;
}

export interface VehicleBookingSchedule {
  id: number;
  reference: string;
  starts_at: string;
  ends_at: string;
  status: string;
  payment_received_at?: string | null;
  confirmed_at?: string | null;
  cancelled_at?: string | null;
  cancellation_reason?: string | null;
  vehicle?: {
    id: number;
    reference: string;
    make: string;
    name: string;
    plate_number: string | null;
    lessor?: {
      id: number;
      name: string;
      email: string;
      mobile: string | null;
    } | null;
  } | null;
  renter?: {
    id: number;
    name: string;
    email: string;
    mobile: string | null;
  } | null;
  payment?: {
    id: number;
    payment_method: string;
    reference_number: string | null;
    rental_total_amount: string | number;
    reservation_fee_amount: string | number;
    service_fee_amount: string | number;
    amount_paid: string | number;
    balance_due_amount: string | number;
    status: string;
    submitted_at: string | null;
    verified_at: string | null;
    admin_note: string | null;
    lessor_confirmed_at: string | null;
    lessor_note: string | null;
    screenshot_original_name: string | null;
    screenshot_url: string | null;
  } | null;
  settlement_qr?: {
    payment_method: string;
    account_name: string | null;
    account_number: string | null;
    qr_url: string | null;
  } | null;
  settlement?: {
    id: number;
    payment_method: string;
    reference_number: string;
    settlement_amount: string | number;
    status: string;
    submitted_at: string | null;
    admin_note: string | null;
    screenshot_original_name: string | null;
    screenshot_url: string | null;
  } | null;
}

export interface VehicleScheduleResult {
  success: boolean;
  message: string;
  holidays: VehicleHoliday[];
  bookings: VehicleBookingSchedule[];
}

export interface LessorBookingsResult {
  success: boolean;
  message: string;
  bookings: VehicleBookingSchedule[];
}

export interface LessorAuthResult {
  success: boolean;
  message: string;
  account?: LocalLessorProfile;
  redirectTo?: string;
}

export type LessorVerificationChannel = 'email' | 'mobile';

export interface LessorVerificationResult {
  success: boolean;
  message: string;
  account?: LocalLessorProfile;
  demoCode?: string;
  authorizationToken?: string;
}

@Injectable({ providedIn: 'root' })
export class LessorAuthService {
  private readonly vehiclesKey = 'rental_platform_lessor_vehicles';
  private readonly sessionKey = 'rental_platform_current_lessor';
  private readonly tokenKey = 'access_token';
  private readonly registerUrl = `${environment.apiBaseUrl}${environment.lessorRegisterPath}`;
  private readonly loginUrl = `${environment.apiBaseUrl}${environment.lessorLoginPath}`;
  private readonly profileUrl = `${environment.apiBaseUrl}${environment.lessorProfilePath}`;
  private readonly verificationRequestUrl = `${environment.apiBaseUrl}${environment.lessorVerificationRequestPath}`;
  private readonly verificationVerifyUrl = `${environment.apiBaseUrl}${environment.lessorVerificationVerifyPath}`;
  private readonly vehiclesUrl = `${environment.apiBaseUrl}${environment.lessorVehiclesPath}`;
  private contactChangeTokens: Record<LessorVerificationChannel, string> = { email: '', mobile: '' };

  constructor(private http: HttpClient) {}

  register(account: LessorRegistration): Observable<LessorAuthResult> {
    const credentials: LessorCredentials = {
      email: account.email.trim().toLowerCase(),
      password: account.password
    };

    return this.http.post<RegisterResponse>(this.registerUrl, {
      name: account.name.trim(),
      mobile: this.normalizePhilippineMobile(account.mobile),
      email: credentials.email,
      password: credentials.password,
      type: 'Vehicle Lessor'
    }).pipe(
      switchMap(registerResponse => this.login(credentials.email, credentials.password).pipe(
        map(loginResult => loginResult.success
          ? { ...loginResult, message: registerResponse.message }
          : loginResult)
      )),
      catchError(error => of({
        success: false,
        message: this.extractApiError(error)
      }))
    );
  }

  login(email: string, password: string): Observable<LessorAuthResult> {
    const normalizedEmail = email.trim().toLowerCase();

    return this.http.post<LoginResponse>(this.loginUrl, {
      email: normalizedEmail,
      password
    }).pipe(
      map(response => {
        if (response.user.category !== 'Lessor') {
          sessionStorage.removeItem(this.sessionKey);

          if (response.user.category === 'Renter') {
            sessionStorage.setItem(this.tokenKey, response.token);
            sessionStorage.setItem('rental_platform_current_user', JSON.stringify({
              id: String(response.user.id),
              name: response.user.name,
              email: response.user.email,
              countryCode: '+63',
              mobile: response.user.mobile || '',
              accountType: 'Renter',
              type: response.user.type,
              category: response.user.category,
              categoryId: response.user.category_id,
              typeId: response.user.type_id
            }));
          } else {
            sessionStorage.removeItem(this.tokenKey);
          }

          return {
            success: false,
            message: response.user.category === 'Renter'
              ? 'This is a renter account. Redirecting you to the renter portal.'
              : 'This account does not have access to the lessor portal.',
            redirectTo: response.user.category === 'Renter' ? '/' : '/authentication/login'
          };
        }

        const account = this.mapApiAccount(response.user);

        this.startSession(account, response.token);

        return {
          success: true,
          message: 'Login successful.',
          account
        };
      }),
      catchError(error => of({
        success: false,
        message: this.extractApiError(error)
      }))
    );
  }

  logout(): void {
    sessionStorage.removeItem(this.sessionKey);
    sessionStorage.removeItem(this.tokenKey);
    this.contactChangeTokens = { email: '', mobile: '' };
  }

  getCurrentLessor(): LocalLessorProfile | null {
    const stored = sessionStorage.getItem(this.sessionKey);
    if (!stored) {
      return null;
    }

    try {
      const account = JSON.parse(stored) as LocalLessorProfile;
      if (account.category !== 'Lessor') {
        this.logout();
        return null;
      }
      return account;
    } catch {
      this.logout();
      return null;
    }
  }

  requestVerificationCode(channel: LessorVerificationChannel): Observable<LessorVerificationResult> {
    return this.requestVerification(channel, 'contact_verification');
  }

  verifyContact(channel: LessorVerificationChannel, code: string): Observable<LessorVerificationResult> {
    return this.verifyCode(channel, 'contact_verification', code);
  }

  requestContactChangeCode(channel: LessorVerificationChannel): Observable<LessorVerificationResult> {
    return this.requestVerification(channel, 'contact_change');
  }

  authorizeContactChange(channel: LessorVerificationChannel, code: string): Observable<LessorVerificationResult> {
    return this.verifyCode(channel, 'contact_change', code).pipe(
      map(result => {
        if (result.success && result.authorizationToken) {
          this.contactChangeTokens[channel] = result.authorizationToken;
        }
        return result;
      })
    );
  }

  updateProfile(updates: { name: string; email: string; mobile: string }): Observable<LessorVerificationResult> {
    const account = this.getCurrentLessor();
    if (!account) {
      return of({ success: false, message: 'Your lessor session has expired. Please log in again.' });
    }

    const email = updates.email.trim().toLowerCase();
    const mobile = this.normalizePhilippineMobile(updates.mobile);
    return this.http.put<ProfileResponse>(this.profileUrl, {
      name: updates.name.trim(),
      email,
      mobile,
      email_change_token: this.contactChangeTokens.email || null,
      mobile_change_token: this.contactChangeTokens.mobile || null
    }).pipe(
      map(response => {
        const updatedAccount = this.mapApiAccount(response.user);
        sessionStorage.setItem(this.sessionKey, JSON.stringify(updatedAccount));
        this.contactChangeTokens = { email: '', mobile: '' };

        if (email !== account.email) {
          const vehicles = this.readVehicles().map(vehicle =>
            vehicle.ownerEmail === account.email ? { ...vehicle, ownerEmail: email } : vehicle
          );
          localStorage.setItem(this.vehiclesKey, JSON.stringify(vehicles));
        }

        return {
          success: true,
          message: response.message || 'Lessor profile updated successfully.',
          account: updatedAccount
        };
      }),
      catchError(error => of({ success: false, message: this.extractApiError(error) }))
    );
  }

  loadProfile(): Observable<LessorVerificationResult> {
    return this.http.get<ProfileResponse>(this.profileUrl).pipe(
      map(response => {
        const account = this.mapApiAccount(response.user);
        sessionStorage.setItem(this.sessionKey, JSON.stringify(account));
        return { success: true, message: 'Profile loaded.', account };
      }),
      catchError(error => of({ success: false, message: this.extractApiError(error) }))
    );
  }

  getVehicles(ownerEmail: string): LocalLessorVehicle[] {
    return this.readVehicles().filter(vehicle => vehicle.ownerEmail === ownerEmail.toLowerCase());
  }

  loadVehicles(ownerEmail: string): Observable<LocalLessorVehicle[]> {
    return this.http.get<VehicleListResponse>(this.vehiclesUrl).pipe(
      map(response => {
        const vehicles = response.vehicles.map(vehicle => this.mapApiVehicle(vehicle, ownerEmail));
        const otherVehicles = this.readVehicles()
          .filter(vehicle => vehicle.ownerEmail !== ownerEmail.toLowerCase());
        localStorage.setItem(this.vehiclesKey, JSON.stringify([...otherVehicles, ...vehicles]));
        return vehicles;
      }),
      catchError(() => of(this.getVehicles(ownerEmail)))
    );
  }

  addVehicle(vehicle: Omit<LocalLessorVehicle, 'id'>): Observable<LessorVehicleResult> {
    return this.http.post<VehicleResponse>(this.vehiclesUrl, this.toApiVehiclePayload(vehicle)).pipe(
      map(response => {
        const created = this.mapApiVehicle(response.vehicle, vehicle.ownerEmail);
        const vehicles = this.readVehicles().filter(existing => existing.id !== created.id);
        localStorage.setItem(this.vehiclesKey, JSON.stringify([...vehicles, created]));

        return {
          success: true,
          message: response.message,
          vehicle: created
        };
      }),
      catchError(error => of({
        success: false,
        message: this.extractApiError(error)
      }))
    );
  }

  updateVehicle(vehicleId: string, updates: Partial<Omit<LocalLessorVehicle, 'id' | 'ownerEmail'>>): LocalLessorVehicle | null {
    const vehicles = this.readVehicles();
    const index = vehicles.findIndex(vehicle => vehicle.id === vehicleId);
    if (index === -1) {
      return null;
    }

    vehicles[index] = { ...vehicles[index], ...updates };
    localStorage.setItem(this.vehiclesKey, JSON.stringify(vehicles));
    return vehicles[index];
  }

  saveVehicle(
    vehicleId: string,
    updates: Partial<Omit<LocalLessorVehicle, 'id' | 'ownerEmail'>>
  ): Observable<LessorVehicleResult> {
    const existing = this.readVehicles().find(vehicle => vehicle.id === vehicleId);
    if (!existing) {
      return of({ success: false, message: 'Vehicle not found.' });
    }

    const merged = { ...existing, ...updates };
    return this.http.put<VehicleResponse>(
      `${this.vehiclesUrl}/${vehicleId}`,
      this.toApiVehiclePayload(merged)
    ).pipe(
      map(response => {
        const updated = this.mapApiVehicle(response.vehicle, existing.ownerEmail);
        const vehicles = this.readVehicles().filter(vehicle => vehicle.id !== vehicleId);
        localStorage.setItem(this.vehiclesKey, JSON.stringify([...vehicles, updated]));
        return { success: true, message: response.message, vehicle: updated };
      }),
      catchError(error => of({ success: false, message: this.extractApiError(error) }))
    );
  }

  loadVehicleSchedule(vehicleId: string): Observable<VehicleScheduleResult> {
    return this.http.get<{ holidays: VehicleHoliday[]; bookings: VehicleBookingSchedule[] }>(
      `${this.vehiclesUrl}/${vehicleId}/schedule`
    ).pipe(
      map(response => ({
        success: true,
        message: 'Vehicle schedule loaded.',
        holidays: response.holidays || [],
        bookings: response.bookings || []
      })),
      catchError(error => of({
        success: false,
        message: this.extractApiError(error),
        holidays: [],
        bookings: []
      }))
    );
  }

  addVehicleHoliday(
    vehicleId: string,
    holiday: { starts_at: string; ends_at: string; reason?: string }
  ): Observable<{ success: boolean; message: string; holiday?: VehicleHoliday }> {
    return this.http.post<{ message: string; holiday: VehicleHoliday }>(
      `${this.vehiclesUrl}/${vehicleId}/holidays`,
      holiday
    ).pipe(
      map(response => ({ success: true, message: response.message, holiday: response.holiday })),
      catchError(error => of({ success: false, message: this.extractApiError(error) }))
    );
  }

  removeVehicleHoliday(vehicleId: string, holidayId: number): Observable<{ success: boolean; message: string }> {
    return this.http.delete<{ message: string }>(
      `${this.vehiclesUrl}/${vehicleId}/holidays/${holidayId}`
    ).pipe(
      map(response => ({ success: true, message: response.message })),
      catchError(error => of({ success: false, message: this.extractApiError(error) }))
    );
  }

  loadBookings(filters: { status?: string; search?: string } = {}): Observable<LessorBookingsResult> {
    const params: Record<string, string> = {};

    if (filters.status) {
      params['status'] = filters.status;
    }

    if (filters.search) {
      params['search'] = filters.search;
    }

    return this.http.get<{ bookings: VehicleBookingSchedule[] }>(
      `${environment.apiBaseUrl}/api/landlord/bookings`,
      { params }
    ).pipe(
      map(response => ({
        success: true,
        message: 'Bookings loaded.',
        bookings: response.bookings || []
      })),
      catchError(error => of({
        success: false,
        message: this.extractApiError(error),
        bookings: []
      }))
    );
  }

  confirmBooking(bookingId: number, lessorNote = ''): Observable<{ success: boolean; message: string; booking?: VehicleBookingSchedule }> {
    return this.http.patch<{ message: string; booking: VehicleBookingSchedule }>(
      `${environment.apiBaseUrl}/api/landlord/bookings/${bookingId}/confirm`,
      { lessor_note: lessorNote || null }
    ).pipe(
      map(response => ({
        success: true,
        message: response.message,
        booking: response.booking
      })),
      catchError(error => of({
        success: false,
        message: this.extractApiError(error)
      }))
    );
  }

  private startSession(account: LocalLessorProfile, token: string): void {
    sessionStorage.setItem(this.sessionKey, JSON.stringify(account));
    sessionStorage.setItem(this.tokenKey, token);
  }

  private requestVerification(
    channel: LessorVerificationChannel,
    purpose: 'contact_verification' | 'contact_change'
  ): Observable<LessorVerificationResult> {
    return this.http.post<VerificationResponse>(this.verificationRequestUrl, { channel, purpose }).pipe(
      map(response => ({
        success: true,
        message: response.message,
        demoCode: response.demo_code
      })),
      catchError(error => of({ success: false, message: this.extractApiError(error) }))
    );
  }

  private verifyCode(
    channel: LessorVerificationChannel,
    purpose: 'contact_verification' | 'contact_change',
    code: string
  ): Observable<LessorVerificationResult> {
    return this.http.post<VerificationResponse>(this.verificationVerifyUrl, {
      channel,
      purpose,
      code: code.trim()
    }).pipe(
      map(response => {
        const account = response.user ? this.mapApiAccount(response.user) : undefined;
        if (account) {
          sessionStorage.setItem(this.sessionKey, JSON.stringify(account));
        }
        return {
          success: true,
          message: response.message,
          account,
          authorizationToken: response.authorization_token
        };
      }),
      catchError(error => of({ success: false, message: this.extractApiError(error) }))
    );
  }

  private mapApiAccount(user: ApiLessorUser): LocalLessorProfile {
    return {
      id: String(user.id),
      name: user.name,
      mobile: user.mobile || '',
      email: user.email.toLowerCase(),
      type: user.type,
      typeId: user.type_id,
      category: user.category,
      categoryId: user.category_id,
      isActive: user.is_active,
      emailVerified: Boolean(user.email_verified_at || user.email_verified),
      mobileVerified: Boolean(user.mobile_verified_at || user.mobile_verified)
    };
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

  private toApiVehiclePayload(vehicle: Omit<LocalLessorVehicle, 'id'>): Record<string, unknown> {
    return {
      make: vehicle.make,
      name: vehicle.name,
      plate_number: vehicle.plateNumber,
      motor_vehicle_file_number: vehicle.motorVehicleFileNumber,
      chassis_number: vehicle.chassisNumber,
      engine_number: vehicle.engineNumber,
      color: vehicle.color,
      next_renewal_period: vehicle.nextRenewalPeriod,
      seats: vehicle.seats,
      transmission: vehicle.transmission,
      rental_type: vehicle.rentalType,
      balance_payment_timing: vehicle.balancePaymentTiming,
      with_driver_surcharge_12hrs: vehicle.withDriverSurcharge12hrs ?? 0,
      with_driver_surcharge_24hrs: vehicle.withDriverSurcharge24hrs ?? 0,
      offers_delivery_and_pickup: vehicle.offersDeliveryAndPickup ?? false,
      delivery_location_rates: vehicle.deliveryLocationRates ?? [],
      pickup_location_rates: vehicle.pickupLocationRates ?? [],
      location: vehicle.location,
      province_code: vehicle.provinceCode || null,
      city_municipality_code: vehicle.cityMunicipalityCode || null,
      barangay_code: vehicle.barangayCode || null,
      price_12hrs: vehicle.price12hrs ?? null,
      price_24hrs: vehicle.price24hrs ?? null,
      available_dates: vehicle.availableDates ?? []
    };
  }

  private mapApiVehicle(vehicle: ApiVehicle, ownerEmail: string): LocalLessorVehicle {
    return {
      id: String(vehicle.id),
      reference: vehicle.reference,
      ownerEmail: ownerEmail.toLowerCase(),
      name: vehicle.name,
      make: vehicle.make,
      plateNumber: vehicle.plate_number || '',
      motorVehicleFileNumber: vehicle.motor_vehicle_file_number || '',
      chassisNumber: vehicle.chassis_number || '',
      engineNumber: vehicle.engine_number || '',
      color: vehicle.color || '',
      nextRenewalPeriod: vehicle.next_renewal_period || '',
      rentalType: vehicle.rental_type,
      location: vehicle.location,
      status: vehicle.status === 'approved' ? 'Approved' : 'For review',
      submittedAt: vehicle.submitted_at,
      seats: vehicle.seats,
      transmission: vehicle.transmission,
      balancePaymentTiming: vehicle.balance_payment_timing,
      withDriverSurcharge12hrs: Number(vehicle.with_driver_surcharge_12hrs || 0),
      withDriverSurcharge24hrs: Number(vehicle.with_driver_surcharge_24hrs || 0),
      offersDeliveryAndPickup: vehicle.offers_delivery_and_pickup,
      deliveryLocationRates: vehicle.delivery_location_rates || [],
      pickupLocationRates: vehicle.pickup_location_rates || [],
      provinceCode: vehicle.province_code || '',
      cityMunicipalityCode: vehicle.city_municipality_code || '',
      barangayCode: vehicle.barangay_code || '',
      documentStatus: vehicle.document_status === 'submitted' ? 'Submitted' : 'Not submitted',
      price12hrs: vehicle.price_12hrs,
      price24hrs: vehicle.price_24hrs,
      availableDates: vehicle.available_dates || []
    };
  }

  private extractApiError(error: unknown): string {
    if (!(error instanceof HttpErrorResponse)) {
      return 'Unable to connect to the server. Please try again.';
    }

    const validationErrors = error.error?.errors as Record<string, string[]> | undefined;
    const firstValidationError = validationErrors
      ? Object.values(validationErrors).flat().find(Boolean)
      : null;

    return firstValidationError
      || error.error?.message
      || (error.status === 0
        ? 'Unable to reach the rental API. Please check that the server is running.'
        : 'The request could not be completed. Please try again.');
  }

  private readVehicles(): LocalLessorVehicle[] {
    const stored = localStorage.getItem(this.vehiclesKey);
    return stored ? JSON.parse(stored) as LocalLessorVehicle[] : [];
  }
}
