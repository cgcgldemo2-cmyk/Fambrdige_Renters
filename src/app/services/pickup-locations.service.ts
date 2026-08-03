import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
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

interface DocumentedApiResponse {
  success: boolean;
  message?: string;
  data: unknown[];
}

interface CurrentApiResponse {
  pickup_locations: unknown[];
}

@Injectable({ providedIn: 'root' })
export class PickupLocationsService {
  private readonly endpoint = `${environment.apiBaseUrl}${environment.pickupLocationsPath}`;

  constructor(private readonly http: HttpClient) {}

  getPickupLocations(): Observable<PickupLocation[]> {
    return this.http.get<unknown>(this.endpoint).pipe(
      map(response => this.parseResponse(response)),
      catchError((error: unknown) => throwError(() => this.toUserError(error)))
    );
  }

  private parseResponse(response: unknown): PickupLocation[] {
    let rawLocations: unknown[];

    if (Array.isArray(response)) {
      rawLocations = response;
    } else if (this.isCurrentResponse(response)) {
      rawLocations = response.pickup_locations;
    } else if (this.isDocumentedResponse(response)) {
      if (!response.success) {
        throw new Error(response.message || 'Pickup locations could not be loaded.');
      }
      rawLocations = response.data;
    } else {
      throw new Error('The pickup-location response has an unsupported format.');
    }

    return rawLocations
      .map(location => this.normalizeLocation(location))
      .filter((location): location is PickupLocation => location !== null)
      .filter(location => location.isActive);
  }

  private normalizeLocation(value: unknown): PickupLocation | null {
    if (!this.isObject(value)) return null;

    const id = Number(value['id']);
    const name = this.readString(value, 'name', 'location_name');
    if (!Number.isFinite(id) || !name) return null;

    return {
      id,
      name,
      shortName: this.readString(value, 'shortName', 'short_name') || name,
      category: this.readString(value, 'category', 'type'),
      city: this.readString(value, 'city'),
      province: this.readString(value, 'province'),
      region: this.readString(value, 'region'),
      isActive: this.readBoolean(value, 'isActive', 'is_active') ?? true
    };
  }

  private toUserError(error: unknown): Error {
    if (error instanceof Error && !(error instanceof HttpErrorResponse)) return error;
    return new Error('Pickup locations are temporarily unavailable. Please try again.');
  }

  private isDocumentedResponse(value: unknown): value is DocumentedApiResponse {
    return this.isObject(value)
      && typeof value['success'] === 'boolean'
      && Array.isArray(value['data']);
  }

  private isCurrentResponse(value: unknown): value is CurrentApiResponse {
    return this.isObject(value) && Array.isArray(value['pickup_locations']);
  }

  private readString(value: Record<string, unknown>, ...keys: string[]): string {
    for (const key of keys) {
      if (typeof value[key] === 'string') return value[key].trim();
    }
    return '';
  }

  private readBoolean(value: Record<string, unknown>, ...keys: string[]): boolean | undefined {
    for (const key of keys) {
      if (typeof value[key] === 'boolean') return value[key];
      if (value[key] === 1 || value[key] === '1') return true;
      if (value[key] === 0 || value[key] === '0') return false;
    }
    return undefined;
  }

  private isObject(value: unknown): value is Record<string, unknown> {
    return typeof value === 'object' && value !== null;
  }
}
