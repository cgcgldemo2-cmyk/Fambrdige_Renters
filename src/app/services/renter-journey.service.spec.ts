import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { RenterProfile } from '../models/renter-journey.models';
import { RenterJourneyService } from './renter-journey.service';

describe('RenterJourneyService', () => {
  beforeEach(() => {
    sessionStorage.clear();
    sessionStorage.setItem('access_token', 'e30.eyJuYW1lIjoiVGVzdCBSZW50ZXIiLCJlbWFpbCI6InJlbnRlckBleGFtcGxlLmNvbSIsIm1vYmlsZSI6IjA5MTcxMjM0NTY3IiwiZXhwIjo0MTAyNDQ0ODAwfQ.signature');
    TestBed.configureTestingModule({});
  });

  afterEach(() => sessionStorage.clear());

  it('initializes the profile from JWT claims without constructor-order errors', fakeAsync(() => {
    const service = TestBed.inject(RenterJourneyService);
    let profile: RenterProfile | undefined;

    service.getProfile().subscribe(value => profile = value);
    tick(350);

    expect(profile?.fullName).toBe('Test Renter');
    expect(profile?.email).toBe('renter@example.com');
    expect(profile?.mobile).toBe('09171234567');
  }));
  it('loads My Bookings after authenticated service initialization', fakeAsync(() => {
    const service = TestBed.inject(RenterJourneyService);
    let bookingCount = 0;

    service.getBookings().subscribe(bookings => bookingCount = bookings.length);
    tick(450);

    expect(bookingCount).toBeGreaterThan(0);
  }));
});