import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface PickupLocation {
  id: number;
  name: string;
  shortName: string;
  category: string;
  city: string;
  province: string;
  region: string;
  isActive: boolean;
}

interface PickupLocationsApiResponse {
  success: boolean;
  message?: string;
  data: PickupLocation[];
}

@Injectable({ providedIn: 'root' })
export class PickupLocationsService {
  private readonly endpoint = `${environment.apiBaseUrl}${environment.pickupLocationsPath}`;

  constructor(private readonly http: HttpClient) {}

  getPickupLocations(): Observable<PickupLocation[]> {
    return this.http.get<unknown>(this.endpoint).pipe(
      map(response => this.parseResponse(response))
    );
  }

  private parseResponse(response: unknown): PickupLocation[] {
    if (!this.isResponse(response) || !response.success) {
      const message = this.isObject(response) && typeof response['message'] === 'string'
        ? response['message']
        : 'Pickup locations could not be loaded.';
      throw new Error(message);
    }

    return response.data.filter(location => location.isActive);
  }

  private isResponse(response: unknown): response is PickupLocationsApiResponse {
    return this.isObject(response)
      && typeof response['success'] === 'boolean'
      && Array.isArray(response['data'])
      && response['data'].every(location => this.isPickupLocation(location));
  }

  private isPickupLocation(location: unknown): location is PickupLocation {
    return this.isObject(location)
      && typeof location['id'] === 'number'
      && typeof location['name'] === 'string'
      && typeof location['shortName'] === 'string'
      && typeof location['category'] === 'string'
      && typeof location['city'] === 'string'
      && typeof location['province'] === 'string'
      && typeof location['region'] === 'string'
      && typeof location['isActive'] === 'boolean';
  }

  private isObject(value: unknown): value is Record<string, unknown> {
    return typeof value === 'object' && value !== null;
  }
}
