import { DOCUMENT } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RenterVehicleSearchService } from './renter-vehicle-search.service';

describe('RenterVehicleSearchService', () => {
  let service: RenterVehicleSearchService;
  let httpTesting: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()]
    });
    service = TestBed.inject(RenterVehicleSearchService);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpTesting.verify());

  it('builds the API request locally and maps data.vehicles', () => {
    let vehicleName = '';
    service.search({
      code: 'FB-TEST-ABC123',
      pickupDate: '2026-08-01',
      pickupTime: '10:00',
      rentalDays: 3,
      rentalType: 'With Driver',
      pickupLocationId: 7,
      sortBy: 'price_asc',
      page: 2,
      perPage: 10
    }).subscribe(result => vehicleName = result.vehicles[0].name);

    const request = httpTesting.expectOne(req =>
      req.url === 'https://api.cgicsoftwaresolution.com/api/renter/available-vehicles'
    );

    expect(request.request.params.get('lessor_id')).toBe('2');
    expect(request.request.params.get('code')).toBe('FB-TEST-ABC123');
    expect(request.request.params.get('starts_at')).toBe('2026-08-01T10:00:00');
    expect(request.request.params.get('ends_at')).toBe('2026-08-04T10:00:00');
    expect(request.request.params.get('pickup_location_id')).toBe('7');
    expect(request.request.params.get('rental_type')).toBe('with_driver');
    expect(request.request.params.get('sort_by')).toBe('price_asc');
    expect(request.request.params.get('page')).toBe('2');
    request.flush(successResponse());

    expect(vehicleName).toBe('Toyota Fortuner 2024');
  });

  it('rejects a successful response when data.vehicles is missing', () => {
    let message = '';
    service.search({
      code: 'FB-TEST-ABC123',
      pickupDate: '2026-08-01',
      pickupTime: '10:00',
      rentalDays: 1,
      rentalType: 'Self Drive'
    }).subscribe({ error: error => message = error.message });

    const request = httpTesting.expectOne(req => req.url.includes('/api/renter/available-vehicles'));
    request.flush({ success: true, data: { lessor: {}, pagination: {} } });

    expect(message).toContain('invalid response');
  });

  it('reads the deployment business code from document metadata', () => {
    const document = TestBed.inject(DOCUMENT);
    const meta = document.querySelector<HTMLMetaElement>('meta[name="fambridge-business-code"]')
      || document.head.appendChild(document.createElement('meta'));
    const originalContent = meta.content;
    meta.name = 'fambridge-business-code';
    meta.content = ' FB-STORE-123 ';

    expect(service.getConfiguredBusinessCode()).toBe('FB-STORE-123');

    meta.content = '';
    expect(service.getConfiguredBusinessCode()).toBe('FB-TEST-ABC123');
    meta.content = originalContent;
  });

  function successResponse(): Record<string, unknown> {
    return {
      success: true,
      data: {
        lessor: { id: 1, code: 'FB-TEST-ABC123', name: 'ABRental' },
        vehicles: [{
          id: 10,
          reference: 'VI-TEST-10',
          lessor_id: 1,
          make: 'Toyota',
          name: 'Toyota Fortuner 2024',
          image_url: null,
          pickup_address: 'Davao City',
          vehicle_type: 'SUV',
          seats: '7',
          transmission: 'Automatic',
          fuel_type: 'Gasoline',
          rental_type: 'both',
          price_12hrs: '2500.00',
          price_24hrs: '4000.00',
          available_dates: ['2026-08-01'],
          calculated_price: {
            base_price: 12000,
            days: 3,
            hours: 72,
            with_driver_surcharge: 2400,
            estimated_total_without_driver: 12000,
            estimated_total_with_driver: 14400
          },
          badge: 'New'
        }],
        pagination: { current_page: 2, per_page: 10, total: 1, last_page: 2, from: 1, to: 1 }
      }
    };
  }
});
