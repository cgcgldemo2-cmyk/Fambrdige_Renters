import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, Subscription, takeUntil } from 'rxjs';
import {
  RenterVehicle,
  RenterVehiclePagination,
  RenterVehicleSearchRequest,
  RenterVehicleSearchService,
  RenterVehicleSort
} from '../../services/renter-vehicle-search.service';
import { BookingSearchData } from '../shared/booking-search/booking-search.component';
import { RentersSearchResultsSharedModule } from './renters-search-results-shared.module';

@Component({
  selector: 'app-renters-search-results',
  standalone: true,
  imports: [CommonModule, FormsModule, RentersSearchResultsSharedModule],
  templateUrl: './renters-search-results.component.html',
  styleUrls: ['./renters-search-results.component.scss']
})
export class RentersSearchResultsComponent implements OnInit, OnDestroy {
  private readonly destroy$ = new Subject<void>();
  private activeSearch?: Subscription;

  isEditingSearch = false;
  store = { name: 'ABRental', domain: 'abrental.cgicsoftwaresolution.com', phone: '0999 123 4567' };
  search: BookingSearchData = {
    pickupLocation: '',
    pickupCity: '',
    pickupDate: '',
    pickupTime: '',
    rentalDays: 1,
    rentalType: 'Self Drive'
  };
  cars: RenterVehicle[] = [];
  pagination: RenterVehiclePagination | null = null;
  isLoading = false;
  errorMessage = '';
  showMobileFilter = false;
  sortBy: RenterVehicleSort = 'newest';

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly vehicleSearchService: RenterVehicleSearchService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.pipe(takeUntil(this.destroy$)).subscribe(query => {
      this.search = {
        code: query['code'] || this.vehicleSearchService.getConfiguredBusinessCode(),
        pickupLocationId: this.toPositiveNumber(query['pickupLocationId']),
        pickupLocation: query['pickupLocation'] || '',
        pickupCity: query['pickupCity'] || '',
        pickupDate: query['pickupDate'] || '',
        pickupTime: query['pickupTime'] || '',
        rentalDays: this.toPositiveNumber(query['rentalDays']) || 1,
        rentalType: query['rentalType'] || 'Self Drive'
      };
      this.sortBy = this.isSort(query['sortBy']) ? query['sortBy'] : 'newest';
      this.loadVehicles(this.toPositiveNumber(query['page']) || 1);
    });
  }

  ngOnDestroy(): void {
    this.activeSearch?.unsubscribe();
    this.destroy$.next();
    this.destroy$.complete();
  }

  onSearchUpdated(updatedSearch: BookingSearchData): void {
    this.isEditingSearch = false;
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { ...updatedSearch, page: 1, sortBy: this.sortBy },
      queryParamsHandling: 'merge'
    });
  }

  onSortChanged(): void {
    this.updateResultQuery({ sortBy: this.sortBy, page: 1 });
  }

  onPageChanged(page: number): void {
    if (!this.pagination || page < 1 || page > this.pagination.last_page || page === this.pagination.current_page) {
      return;
    }
    this.updateResultQuery({ page });
  }

  private loadVehicles(page: number): void {
    const request = this.buildRequest(page);
    if (!request) {
      this.cars = [];
      this.pagination = null;
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    this.activeSearch?.unsubscribe();
    this.activeSearch = this.vehicleSearchService.search(request).pipe(takeUntil(this.destroy$)).subscribe({
      next: response => {
        this.cars = response.data.vehicles;
        this.pagination = response.data.pagination;
        this.store = { ...this.store, name: response.data.lessor.name };
        this.isLoading = false;
      },
      error: (error: HttpErrorResponse) => {
        this.cars = [];
        this.pagination = null;
        this.errorMessage = this.getErrorMessage(error);
        this.isLoading = false;
      }
    });
  }

  private buildRequest(page: number): RenterVehicleSearchRequest | null {
    if (!this.search.code) {
      this.errorMessage = 'This rental business is not configured for vehicle search.';
      return null;
    }
    if (!this.search.pickupDate || !this.search.pickupTime) {
      this.errorMessage = 'Choose a pickup date and time to search available vehicles.';
      return null;
    }

    const startsAt = new Date(`${this.search.pickupDate}T${this.search.pickupTime}:00`);
    if (Number.isNaN(startsAt.getTime())) {
      this.errorMessage = 'Enter a valid pickup date and time.';
      return null;
    }
    const endsAt = new Date(startsAt);
    endsAt.setDate(endsAt.getDate() + Math.max(1, this.search.rentalDays));

    return {
      code: this.search.code,
      startsAt: this.toLocalDateTime(startsAt),
      endsAt: this.toLocalDateTime(endsAt),
      pickupLocationId: this.search.pickupLocationId || undefined,
      rentalType: this.search.rentalType === 'With Driver' ? 'with_driver' : 'without_driver',
      sortBy: this.sortBy,
      page,
      perPage: 10
    };
  }

  private updateResultQuery(queryParams: Record<string, string | number>): void {
    this.router.navigate([], { relativeTo: this.route, queryParams, queryParamsHandling: 'merge' });
  }

  private toPositiveNumber(value: unknown): number | undefined {
    const parsed = Number(value);
    return Number.isInteger(parsed) && parsed > 0 ? parsed : undefined;
  }

  private isSort(value: unknown): value is RenterVehicleSort {
    return ['newest', 'price_asc', 'price_desc', 'seats_asc', 'seats_desc'].includes(String(value));
  }

  private toLocalDateTime(value: Date): string {
    const pad = (part: number) => String(part).padStart(2, '0');
    return `${value.getFullYear()}-${pad(value.getMonth() + 1)}-${pad(value.getDate())}`
      + `T${pad(value.getHours())}:${pad(value.getMinutes())}:00`;
  }

  private getErrorMessage(error: HttpErrorResponse): string {
    const validationErrors = error.error?.errors as Record<string, string[]> | undefined;
    const firstValidationError = validationErrors && Object.values(validationErrors)[0]?.[0];
    return firstValidationError
      || error.error?.message
      || 'Available vehicles could not be loaded. Please try again.';
  }
}
