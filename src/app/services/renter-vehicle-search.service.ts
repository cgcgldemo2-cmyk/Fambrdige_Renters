import { DOCUMENT } from '@angular/common';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';

export type RenterVehicleSort =
  | 'newest'
  | 'price_asc'
  | 'price_desc'
  | 'seats_asc'
  | 'seats_desc';

export interface RenterVehicleSearchCriteria {
  code?: string;
  pickupLocationId?: number;
  pickupDate: string;
  pickupTime: string;
  rentalDays: number;
  rentalType: string;
  transmission?: 'Automatic' | 'Manual';
  vehicleType?: string;
  fuelType?: string;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: RenterVehicleSort;
  page?: number;
  perPage?: number;
}

export interface RenterVehicleCalculatedPrice {
  basePrice: number;
  days: number;
  hours: number;
  withDriverSurcharge: number;
  estimatedTotalWithoutDriver: number;
  estimatedTotalWithDriver: number;
}

export interface RenterVehicle {
  id: number;
  reference: string;
  lessorId: number;
  make: string;
  name: string;
  imageUrl: string | null;
  pickupAddress: string;
  vehicleType: string;
  seats: number;
  transmission: string;
  fuelType: string;
  rentalType: 'with_driver' | 'without_driver' | 'both';
  price12Hours: number;
  price24Hours: number;
  availableDates: string[];
  calculatedPrice: RenterVehicleCalculatedPrice | null;
  badge: string | null;
}

export interface RenterVehiclePagination {
  currentPage: number;
  perPage: number;
  total: number;
  lastPage: number;
  from: number | null;
  to: number | null;
}

export interface RenterVehicleSearchResult {
  lessor: { id: number; code: string; name: string };
  vehicles: RenterVehicle[];
  pagination: RenterVehiclePagination;
}

interface ApiCalculatedPrice {
  base_price: number | string;
  days: number;
  hours: number;
  with_driver_surcharge: number | string;
  estimated_total_without_driver: number | string;
  estimated_total_with_driver: number | string;
}

interface ApiVehicle {
  id: number;
  reference: string;
  lessor_id: number;
  make: string;
  name: string;
  image_url: string | null;
  pickup_address: string;
  vehicle_type: string;
  seats: number | string;
  transmission: string;
  fuel_type: string;
  rental_type: 'with_driver' | 'without_driver' | 'both';
  price_12hrs: number | string;
  price_24hrs: number | string;
  available_dates: string[];
  calculated_price: ApiCalculatedPrice | null;
  badge: string | null;
}

interface ApiPagination {
  current_page: number;
  per_page: number;
  total: number;
  last_page: number;
  from: number | null;
  to: number | null;
}

interface ApiSearchResponse {
  success: boolean;
  message?: string;
  data: {
    lessor: { id: number; code: string; name: string };
    vehicles: ApiVehicle[];
    pagination: ApiPagination;
  };
}

@Injectable({ providedIn: 'root' })
export class RenterVehicleSearchService {
  private readonly endpoint = `${environment.apiBaseUrl}${environment.renterAvailableVehiclesPath}`;

  constructor(
    private readonly http: HttpClient,
    @Inject(DOCUMENT) private readonly document: Document
  ) {}

  getConfiguredBusinessCode(): string {
    return this.document
      .querySelector<HTMLMetaElement>('meta[name="fambridge-business-code"]')
      ?.content.trim() || environment.businessCode;
  }

  search(criteria: RenterVehicleSearchCriteria): Observable<RenterVehicleSearchResult> {
    let params: HttpParams;
    try {
      params = this.buildParams(criteria);
    } catch (error) {
      return throwError(() => error);
    }

    return this.http.get<unknown>(this.endpoint, { params }).pipe(
      map(response => this.parseResponse(response)),
      catchError(error => throwError(() => this.normalizeError(error)))
    );
  }

  private buildParams(criteria: RenterVehicleSearchCriteria): HttpParams {
    const startsAt = new Date(`${criteria.pickupDate}T${criteria.pickupTime}:00`);
    if (Number.isNaN(startsAt.getTime())) {
      throw new Error('Enter a valid pickup date and time.');
    }

    const endsAt = new Date(startsAt);
    endsAt.setDate(endsAt.getDate() + Math.max(1, criteria.rentalDays));

    let params = new HttpParams()
      .set('starts_at', this.toLocalDateTime(startsAt))
      .set('ends_at', this.toLocalDateTime(endsAt))
      .set('page', criteria.page ?? 1)
      .set('per_page', criteria.perPage ?? 10)
      .set('sort_by', criteria.sortBy ?? 'newest');

    const optionalParams: Record<string, string | number | undefined> = {
      lessor_id: environment.lessorId,
      code: criteria.code?.trim() || environment.businessCode,
      pickup_location_id: criteria.pickupLocationId,
      rental_type: criteria.rentalType === 'With Driver' ? 'with_driver' : 'without_driver',
      transmission: criteria.transmission,
      vehicle_type: criteria.vehicleType,
      fuel_type: criteria.fuelType,
      min_price: criteria.minPrice,
      max_price: criteria.maxPrice
    };

    Object.entries(optionalParams).forEach(([key, value]) => {
      if (value !== undefined && value !== '') {
        params = params.set(key, value);
      }
    });

    return params;
  }

  private parseResponse(response: unknown): RenterVehicleSearchResult {
    if (!this.isResponse(response) || !response.success) {
      const message = this.isObject(response) && typeof response['message'] === 'string'
        ? response['message']
        : 'The available-vehicles API returned an invalid response.';
      throw new Error(message);
    }

    return {
      lessor: response.data.lessor,
      vehicles: response.data.vehicles.map(vehicle => this.mapVehicle(vehicle)),
      pagination: {
        currentPage: response.data.pagination.current_page,
        perPage: response.data.pagination.per_page,
        total: response.data.pagination.total,
        lastPage: response.data.pagination.last_page,
        from: response.data.pagination.from,
        to: response.data.pagination.to
      }
    };
  }

  private mapVehicle(vehicle: ApiVehicle): RenterVehicle {
    const calculatedPrice = vehicle.calculated_price;
    return {
      id: vehicle.id,
      reference: vehicle.reference,
      lessorId: vehicle.lessor_id,
      make: vehicle.make,
      name: vehicle.name,
      imageUrl: vehicle.image_url,
      pickupAddress: vehicle.pickup_address,
      vehicleType: vehicle.vehicle_type,
      seats: Number(vehicle.seats),
      transmission: vehicle.transmission,
      fuelType: vehicle.fuel_type,
      rentalType: vehicle.rental_type,
      price12Hours: Number(vehicle.price_12hrs),
      price24Hours: Number(vehicle.price_24hrs),
      availableDates: vehicle.available_dates,
      calculatedPrice: calculatedPrice ? {
        basePrice: Number(calculatedPrice.base_price),
        days: calculatedPrice.days,
        hours: calculatedPrice.hours,
        withDriverSurcharge: Number(calculatedPrice.with_driver_surcharge),
        estimatedTotalWithoutDriver: Number(calculatedPrice.estimated_total_without_driver),
        estimatedTotalWithDriver: Number(calculatedPrice.estimated_total_with_driver)
      } : null,
      badge: vehicle.badge
    };
  }

  private isResponse(response: unknown): response is ApiSearchResponse {
    if (!this.isObject(response) || typeof response['success'] !== 'boolean') {
      return false;
    }
    if (response['success'] === false) {
      return true;
    }

    const data = response['data'];
    return this.isObject(data)
      && this.isObject(data['lessor'])
      && typeof data['lessor']['id'] === 'number'
      && typeof data['lessor']['code'] === 'string'
      && typeof data['lessor']['name'] === 'string'
      && Array.isArray(data['vehicles'])
      && data['vehicles'].every(vehicle => this.isApiVehicle(vehicle))
      && this.isPagination(data['pagination']);
  }

  private isApiVehicle(vehicle: unknown): vehicle is ApiVehicle {
    return this.isObject(vehicle)
      && typeof vehicle['id'] === 'number'
      && typeof vehicle['reference'] === 'string'
      && typeof vehicle['lessor_id'] === 'number'
      && typeof vehicle['name'] === 'string'
      && typeof vehicle['make'] === 'string'
      && this.isNullableString(vehicle['image_url'])
      && typeof vehicle['pickup_address'] === 'string'
      && typeof vehicle['vehicle_type'] === 'string'
      && this.isNumberLike(vehicle['seats'])
      && typeof vehicle['transmission'] === 'string'
      && typeof vehicle['fuel_type'] === 'string'
      && Array.isArray(vehicle['available_dates'])
      && vehicle['available_dates'].every(date => typeof date === 'string')
      && this.isNumberLike(vehicle['price_12hrs'])
      && this.isNumberLike(vehicle['price_24hrs'])
      && ['with_driver', 'without_driver', 'both'].includes(String(vehicle['rental_type']))
      && (vehicle['calculated_price'] === null || this.isCalculatedPrice(vehicle['calculated_price']))
      && this.isNullableString(vehicle['badge']);
  }

  private isPagination(value: unknown): value is ApiPagination {
    return this.isObject(value)
      && typeof value['current_page'] === 'number'
      && typeof value['per_page'] === 'number'
      && typeof value['total'] === 'number'
      && typeof value['last_page'] === 'number'
      && (value['from'] === null || typeof value['from'] === 'number')
      && (value['to'] === null || typeof value['to'] === 'number');
  }

  private isCalculatedPrice(value: unknown): value is ApiCalculatedPrice {
    return this.isObject(value)
      && this.isNumberLike(value['base_price'])
      && typeof value['days'] === 'number'
      && typeof value['hours'] === 'number'
      && this.isNumberLike(value['with_driver_surcharge'])
      && this.isNumberLike(value['estimated_total_without_driver'])
      && this.isNumberLike(value['estimated_total_with_driver']);
  }

  private isNumberLike(value: unknown): value is number | string {
    return (typeof value === 'number' && Number.isFinite(value))
      || (typeof value === 'string' && value.trim() !== '' && Number.isFinite(Number(value)));
  }

  private isNullableString(value: unknown): value is string | null {
    return value === null || typeof value === 'string';
  }

  private normalizeError(error: unknown): Error {
    if (error instanceof HttpErrorResponse) {
      const validationErrors = this.isObject(error.error) && this.isObject(error.error['errors'])
        ? error.error['errors']
        : undefined;
      const firstValidation = validationErrors
        ? Object.values(validationErrors).find(value => Array.isArray(value) && typeof value[0] === 'string')
        : undefined;
      const message = Array.isArray(firstValidation)
        ? firstValidation[0]
        : this.isObject(error.error) && typeof error.error['message'] === 'string'
          ? error.error['message']
          : 'Available vehicles could not be loaded. Please try again.';
      return new Error(message);
    }
    return error instanceof Error ? error : new Error('Available vehicles could not be loaded. Please try again.');
  }

  private toLocalDateTime(value: Date): string {
    const pad = (part: number) => String(part).padStart(2, '0');
    return `${value.getFullYear()}-${pad(value.getMonth() + 1)}-${pad(value.getDate())}`
      + `T${pad(value.getHours())}:${pad(value.getMinutes())}:00`;
  }

  private isObject(value: unknown): value is Record<string, unknown> {
    return typeof value === 'object' && value !== null;
  }
}
