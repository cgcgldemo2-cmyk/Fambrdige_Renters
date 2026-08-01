import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from '../../environments/environment';
import { RenterAuthService } from './renter-auth.service';

describe('RenterAuthService', () => {
  let service: RenterAuthService;
  let httpTesting: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()]
    });
    service = TestBed.inject(RenterAuthService);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpTesting.verify());

  it('posts a normalized renter registration payload', () => {
    let actualResult: { success: boolean; message: string } | undefined;

    service.register({
      name: '  Test Renter  ',
      email: '  TEST@example.com ',
      mobile: '+63 917 987 6543',
      password: 'Password@123'
    }).subscribe(result => actualResult = result);

    const request = httpTesting.expectOne(`${environment.apiBaseUrl}${environment.renterRegisterPath}`);
    expect(request.request.method).toBe('POST');
    expect(request.request.body).toEqual({
      name: 'Test Renter',
      email: 'test@example.com',
      mobile: '9179876543',
      password: 'Password@123'
    });

    request.flush({ status: true, message: 'Renter registered successfully.' });
    expect(actualResult).toEqual({ success: true, message: 'Renter registered successfully.' });
  });

  it('returns the first API validation message', () => {
    let actualMessage = '';

    service.register({ name: '', email: '', mobile: '', password: '' })
      .subscribe(result => actualMessage = result.message);

    const request = httpTesting.expectOne(`${environment.apiBaseUrl}${environment.renterRegisterPath}`);
    request.flush({
      message: 'Validation error.',
      errors: { email: ['The email field is required.'] }
    }, { status: 422, statusText: 'Unprocessable Entity' });

    expect(actualMessage).toBe('The email field is required.');
  });

  it('rejects a malformed success response', () => {
    let actualResult: { success: boolean; message: string } | undefined;

    service.register({
      name: 'Test Renter',
      email: 'test@example.com',
      mobile: '9179876543',
      password: 'Password@123'
    }).subscribe(result => actualResult = result);

    const request = httpTesting.expectOne(`${environment.apiBaseUrl}${environment.renterRegisterPath}`);
    request.flush({ message: 'Missing status.' });

    expect(actualResult?.success).toBeFalse();
    expect(actualResult?.message).toBe('Missing status.');
  });
});
