import { DOCUMENT } from '@angular/common';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export type RenterVehicleSort =
  | 'newest'
  | 'price_asc'
  | 'price_desc'
  | 'seats_asc'
  | 'seats_desc';

export interface RenterVehicleSearchRequest {
  code?: string;
  startsAt: string;
  endsAt: string;
  pickupLocationId?: number;
  rentalType?: 'with_driver' | 'without_driver' | 'both';
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
  base_price: number;
  days: number;
  hours: number;
  with_driver_surcharge: number;
  estimated_total_without_driver: number;
  estimated_total_with_driver: number;
}

export interface RenterVehicle {
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
  price_12hrs: number;
  price_24hrs: number;
  available_dates: string[];
  calculated_price: RenterVehicleCalculatedPrice | null;
  badge: string | null;
}

export interface RenterVehiclePagination {
  current_page: number;
  per_page: number;
  total: number;
  last_page: number;
  from: number | null;
  to: number | null;
}

export interface RenterVehicleSearchResponse {
  success: boolean;
  message: string;
  data: {
    lessor: { id: number; code: string; name: string };
    vehicles: RenterVehicle[];
    pagination: RenterVehiclePagination;
  };
}

@Injectable({ providedIn: 'root' })
export class RenterVehicleSearchService {
  private readonly endpoint = 'https://api.cgicsoftwaresolution.com/api/renter/available-vehicles';

  constructor(
    private readonly http: HttpClient,
    @Inject(DOCUMENT) private readonly document: Document
  ) {}

  getConfiguredBusinessCode(): string {
    return this.document
      .querySelector<HTMLMetaElement>('meta[name="fambridge-business-code"]')
      ?.content.trim() || '';
  }

  search(request: RenterVehicleSearchRequest): Observable<RenterVehicleSearchResponse> {
    let params = new HttpParams()
      .set('starts_at', request.startsAt)
      .set('ends_at', request.endsAt)
      .set('page', request.page ?? 1)
      .set('per_page', request.perPage ?? 10)
      .set('sort_by', request.sortBy ?? 'newest');

    const optionalParams: Record<string, string | number | undefined> = {
      code: request.code?.trim() || undefined,
      pickup_location_id: request.pickupLocationId,
      rental_type: request.rentalType,
      transmission: request.transmission,
      vehicle_type: request.vehicleType,
      fuel_type: request.fuelType,
      min_price: request.minPrice,
      max_price: request.maxPrice
    };

    Object.entries(optionalParams).forEach(([key, value]) => {
      if (value !== undefined && value !== '') {
        params = params.set(key, value);
      }
    });

    return this.http.get<RenterVehicleSearchResponse>(this.endpoint, { params });
  }
}
