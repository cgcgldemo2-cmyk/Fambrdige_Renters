import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, delay, of } from 'rxjs';
import {
  RentalRequestInput,
  RenterBooking,
  RenterProfile,
  RenterSearchContext,
  RenterVehicleSelection,
  RenterVehicleSnapshot,
  UiMutationResult
} from '../models/renter-journey.models';
import { JwtService } from './jwt.service';
import { RenterVehicle } from './renter-vehicle-search.service';

const SELECTION_KEY = 'fambridge_renter_vehicle_selection';
const BOOKINGS_KEY = 'fambridge_renter_demo_bookings';
const PROFILE_KEY = 'fambridge_renter_demo_profile';

@Injectable({ providedIn: 'root' })
export class RenterJourneyService {
  private readonly jwtService = inject(JwtService);
  private readonly profileSubject = new BehaviorSubject<RenterProfile>(this.loadProfile());
  readonly profile$ = this.profileSubject.asObservable();

  rememberVehicle(vehicle: RenterVehicle, search: RenterSearchContext, totalPrice: number): void {
    const selection: RenterVehicleSelection = {
      search,
      vehicle: {
        id: vehicle.id,
        name: vehicle.name,
        make: vehicle.make,
        imageUrl: vehicle.imageUrl,
        vehicleType: vehicle.vehicleType,
        seats: vehicle.seats,
        transmission: vehicle.transmission,
        fuelType: vehicle.fuelType,
        rentalType: vehicle.rentalType,
        dailyPrice: vehicle.price24Hours,
        estimatedTotal: totalPrice,
        pickupAddress: vehicle.pickupAddress,
        badge: vehicle.badge
      }
    };
    sessionStorage.setItem(SELECTION_KEY, JSON.stringify(selection));
  }

  getVehicleSelection(vehicleId: number): Observable<RenterVehicleSelection | null> {
    const selection = this.readJson<RenterVehicleSelection>(SELECTION_KEY);
    return of(selection?.vehicle.id === vehicleId ? selection : null).pipe(delay(250));
  }

  getCurrentSelection(): RenterVehicleSelection | null {
    return this.readJson<RenterVehicleSelection>(SELECTION_KEY);
  }

  getBookings(): Observable<RenterBooking[]> {
    return of(this.loadBookings()).pipe(delay(450));
  }

  getBooking(reference: string): Observable<RenterBooking | null> {
    return of(this.loadBookings().find(booking => booking.reference === reference) ?? null).pipe(delay(300));
  }

  submitRentalRequest(input: RentalRequestInput): Observable<RenterBooking> {
    const reference = `FB-DEMO-${Date.now().toString().slice(-8)}`;
    const booking: RenterBooking = {
      reference,
      vehicle: input.selection.vehicle,
      search: input.selection.search,
      status: 'Pending Lessor Approval',
      paymentStatus: 'Pending Payment',
      requestedAt: new Date().toISOString(),
      notes: input.notes.trim(),
      isMock: true
    };
    const bookings = [booking, ...this.loadBookings()];
    sessionStorage.setItem(BOOKINGS_KEY, JSON.stringify(bookings));
    return of(booking).pipe(delay(700));
  }

  getProfile(): Observable<RenterProfile> {
    return of(this.profileSubject.value).pipe(delay(350));
  }

  updateProfile(profile: RenterProfile): Observable<UiMutationResult> {
    this.profileSubject.next(profile);
    sessionStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
    return of({
      success: true,
      apiPending: true,
      message: 'Profile changes are saved for this UI preview. Backend profile update is still pending.'
    }).pipe(delay(550));
  }

  changePassword(_request: { currentPassword: string; newPassword: string }): Observable<UiMutationResult> {
    return of({
      success: true,
      apiPending: true,
      message: 'Password validation passed. No password was sent because the backend operation is pending.'
    }).pipe(delay(650));
  }

  private loadProfile(): RenterProfile {
    const stored = this.readJson<RenterProfile>(PROFILE_KEY);
    if (stored) return stored;

    const token = sessionStorage.getItem('access_token') ?? '';
    return {
      fullName: this.jwtService.getField<string>(token, 'name') || 'Renter Account',
      email: this.jwtService.getField<string>(token, 'email') || 'renter@example.com',
      mobile: this.jwtService.getField<string>(token, 'mobile') || '',
      address: '',
      approvalStatus: 'Pending review',
      verificationStatus: 'Not yet verified',
      documentStatus: 'No documents available'
    };
  }

  private loadBookings(): RenterBooking[] {
    return this.readJson<RenterBooking[]>(BOOKINGS_KEY) ?? this.seedBookings();
  }

  private seedBookings(): RenterBooking[] {
    const vehicle: RenterVehicleSnapshot = {
      id: 9001,
      name: 'Toyota Vios',
      make: 'Toyota',
      imageUrl: null,
      vehicleType: 'Sedan',
      seats: 5,
      transmission: 'Automatic',
      fuelType: 'Gasoline',
      rentalType: 'Self Drive',
      dailyPrice: 2200,
      estimatedTotal: 4400,
      pickupAddress: 'Main rental office',
      badge: null
    };
    return [{
      reference: 'FB-DEMO-260801',
      vehicle,
      search: {
        pickupLocation: 'Main rental office',
        pickupCity: '',
        pickupDate: '2026-08-10',
        pickupTime: '09:00',
        returnDate: '2026-08-12',
        returnTime: '09:00',
        rentalDays: 2,
        rentalType: 'Self Drive'
      },
      status: 'Pending Lessor Approval',
      paymentStatus: 'Pending Payment',
      requestedAt: '2026-08-01T09:30:00',
      notes: 'UI preview booking. Backend booking history API is pending.',
      isMock: true
    }];
  }

  private readJson<T>(key: string): T | null {
    try {
      const value = sessionStorage.getItem(key);
      return value ? JSON.parse(value) as T : null;
    } catch {
      return null;
    }
  }
}
