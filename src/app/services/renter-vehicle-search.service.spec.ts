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

  it('maps renter search values to the available vehicles API contract', () => {
    service.search({
      code: 'FB-TEST-ABC123',
      startsAt: '2026-08-01T10:00:00',
      endsAt: '2026-08-04T10:00:00',
      pickupLocationId: 7,
      rentalType: 'with_driver',
      sortBy: 'price_asc',
      page: 2,
      perPage: 10
    }).subscribe();

    const request = httpTesting.expectOne(req =>
      req.url === 'https://api.cgicsoftwaresolution.com/api/renter/available-vehicles'
    );

    expect(request.request.params.get('code')).toBe('FB-TEST-ABC123');
    expect(request.request.params.get('starts_at')).toBe('2026-08-01T10:00:00');
    expect(request.request.params.get('ends_at')).toBe('2026-08-04T10:00:00');
    expect(request.request.params.get('pickup_location_id')).toBe('7');
    expect(request.request.params.get('rental_type')).toBe('with_driver');
    expect(request.request.params.get('sort_by')).toBe('price_asc');
    expect(request.request.params.get('page')).toBe('2');
    expect(request.request.params.get('per_page')).toBe('10');
    request.flush({ success: true, message: '', data: { lessor: {}, vehicles: [], pagination: {} } });
  });

  it('reads the deployment business code from the document metadata', () => {
    const document = TestBed.inject(DOCUMENT);
    const meta = document.querySelector<HTMLMetaElement>('meta[name="fambridge-business-code"]')
      || document.head.appendChild(document.createElement('meta'));
    const originalContent = meta.content;
    meta.name = 'fambridge-business-code';
    meta.content = ' FB-STORE-123 ';

    expect(service.getConfiguredBusinessCode()).toBe('FB-STORE-123');
    meta.content = originalContent;
  });
});
