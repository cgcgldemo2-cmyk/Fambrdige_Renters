import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';

export interface PickupLocation {
  value: string;
  label: string;
  category: string;
}

interface PickupLocationGroup {
  category: string;
  locations: string[];
}

interface PickupLocationsApiResponse {
  pickup_locations: PickupLocationGroup[];
}

@Injectable({
  providedIn: 'root'
})
export class PickupLocationsService {
  private readonly baseUrl = environment.apiBaseUrl;
  private readonly pickupLocationsUrl = `${this.baseUrl}/api/renter/pickup-locations`;
  private pickupLocationsCache$ = new BehaviorSubject<PickupLocation[]>([]);
  private isLoading = false;

  constructor(private http: HttpClient) {}

  /**
   * Fetch pickup locations from the API
   * Results are cached after first successful fetch
   */
  getPickupLocations(): Observable<PickupLocation[]> {
    const cachedLocations = this.pickupLocationsCache$.value;
    
    // Return cached data if available
    if (cachedLocations.length > 0) {
      return of(cachedLocations);
    }

    // Prevent multiple simultaneous requests
    if (this.isLoading) {
      return this.pickupLocationsCache$.asObservable();
    }

    this.isLoading = true;
    return this.http.get<PickupLocationsApiResponse>(this.pickupLocationsUrl).pipe(
      map(response => this.flattenLocations(response.pickup_locations)),
      tap(locations => {
        this.pickupLocationsCache$.next(locations);
        this.isLoading = false;
      }),
      catchError(error => {
        console.error('Error fetching pickup locations:', error);
        this.isLoading = false;
        return of([]);
      })
    );
  }

  /**
   * Force refresh of pickup locations, bypassing cache
   */
  refreshPickupLocations(): Observable<PickupLocation[]> {
    this.isLoading = true;
    return this.http.get<PickupLocationsApiResponse>(this.pickupLocationsUrl).pipe(
      map(response => this.flattenLocations(response.pickup_locations)),
      tap(locations => {
        this.pickupLocationsCache$.next(locations);
        this.isLoading = false;
      }),
      catchError(error => {
        console.error('Error refreshing pickup locations:', error);
        this.isLoading = false;
        return of([]);
      })
    );
  }

  /**
   * Get cached pickup locations synchronously
   */
  getCachedPickupLocations(): PickupLocation[] {
    return this.pickupLocationsCache$.value;
  }

  /**
   * Transform grouped locations into flat array of PickupLocation objects
   */
  private flattenLocations(groups: PickupLocationGroup[]): PickupLocation[] {
    return groups.flatMap(group =>
      group.locations.map(location => ({
        value: location,
        label: location,
        category: group.category
      }))
    );
  }
}

