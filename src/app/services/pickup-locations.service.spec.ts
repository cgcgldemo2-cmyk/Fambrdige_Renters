import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from '../../environments/environment';
import { PickupLocationsService } from './pickup-locations.service';

describe('PickupLocationsService', () => {
  let service: PickupLocationsService;
  let httpTesting: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [provideHttpClient(), provideHttpClientTesting()] });
    service = TestBed.inject(PickupLocationsService);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpTesting.verify());

  it('loads active pickup locations from the configured API', () => {
    let locationNames: string[] = [];
    service.getPickupLocations().subscribe(locations => {
      locationNames = locations.map(location => location.name);
    });

    const request = httpTesting.expectOne(`${environment.apiBaseUrl}${environment.pickupLocationsPath}`);
    request.flush({
      success: true,
      data: [
        location(1, 'NAIA Terminal 3', true),
        location(2, 'Inactive Location', false)
      ]
    });

    expect(locationNames).toEqual(['NAIA Terminal 3']);
  });

  it('reports malformed response envelopes as errors', () => {
    let message = '';
    service.getPickupLocations().subscribe({ error: error => message = error.message });

    const request = httpTesting.expectOne(`${environment.apiBaseUrl}${environment.pickupLocationsPath}`);
    request.flush('<html>Not JSON</html>');

    expect(message).toContain('unsupported format');
  });

  function location(id: number, name: string, isActive: boolean): Record<string, unknown> {
    return {
      id,
      name,
      shortName: name,
      category: 'Airport',
      city: 'Pasay',
      province: 'Metro Manila',
      region: 'NCR',
      isActive
    };
  }
});
