import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  RenterVehicle,
  RenterVehiclePagination,
  RenterVehicleSearchService,
  RenterVehicleSort
} from '../../services/renter-vehicle-search.service';
import { BookingSearchData } from '../shared/booking-search/booking-search.component';
import { RentersSearchResultsSharedModule } from './renters-search-results-shared.module';
import { RenterResultsFilter } from './sections/results-filter/results-filter.component';

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

  readonly store = { ...environment.storefront };
  search: BookingSearchData = {
    pickupLocation: '', pickupCity: '', pickupDate: '', pickupTime: '',
    returnDate: '', returnTime: '', rentalDays: 1, rentalType: 'Self Drive'
  };
  filters: RenterResultsFilter = { rentalType: '', vehicleType: '', transmission: '', maxPrice: null };
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
        returnDate: query['returnDate'] || '',
        returnTime: query['returnTime'] || '',
        rentalDays: this.toPositiveNumber(query['rentalDays']) || 1,
        rentalType: query['rentalType'] || 'Self Drive'
      };
      this.filters = {
        rentalType: this.isRentalType(query['filterRentalType']) ? query['filterRentalType'] : '',
        vehicleType: query['vehicleType'] || '',
        transmission: this.isTransmission(query['transmission']) ? query['transmission'] : '',
        maxPrice: this.toPositiveNumber(query['maxPrice']) || null
      };
      if (this.filters.rentalType) this.search.rentalType = this.filters.rentalType;
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
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { ...updatedSearch, page: 1, sortBy: this.sortBy },
      queryParamsHandling: 'merge'
    });
  }

  onFiltersApplied(filters: RenterResultsFilter): void {
    this.showMobileFilter = false;
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        filterRentalType: filters.rentalType || null,
        vehicleType: filters.vehicleType || null,
        transmission: filters.transmission || null,
        maxPrice: filters.maxPrice || null,
        page: 1
      },
      queryParamsHandling: 'merge'
    });
  }

  onSortChanged(): void { this.updateResultQuery({ sortBy: this.sortBy, page: 1 }); }

  onPageChanged(page: number): void {
    if (!this.pagination || page < 1 || page > this.pagination.lastPage || page === this.pagination.currentPage) return;
    this.updateResultQuery({ page });
  }

  retrySearch(): void {
    this.loadVehicles(this.pagination?.currentPage || this.toPositiveNumber(this.route.snapshot.queryParamMap.get('page')) || 1);
  }

  private loadVehicles(page: number): void {
    if (!this.search.code) return this.failSearch('This rental business is not configured for vehicle search.');
    if (!this.search.pickupDate || !this.search.pickupTime) return this.failSearch('Choose a pickup date and time to search available vehicles.');

    this.isLoading = true;
    this.errorMessage = '';
    this.activeSearch?.unsubscribe();
    this.activeSearch = this.vehicleSearchService.search({
      code: this.search.code,
      pickupLocationId: this.search.pickupLocationId || undefined,
      pickupDate: this.search.pickupDate,
      pickupTime: this.search.pickupTime,
      rentalDays: this.search.rentalDays,
      rentalType: this.filters.rentalType || this.search.rentalType,
      vehicleType: this.filters.vehicleType || undefined,
      transmission: this.filters.transmission || undefined,
      maxPrice: this.filters.maxPrice || undefined,
      sortBy: this.sortBy,
      page,
      perPage: 10
    }).pipe(takeUntil(this.destroy$)).subscribe({
      next: response => {
        this.cars = response.vehicles;
        this.pagination = response.pagination;
        this.store.name = response.lessor.name;
        this.isLoading = false;
      },
      error: (error: Error) => this.failSearch(error.message)
    });
  }

  private failSearch(message: string): void {
    this.cars = [];
    this.pagination = null;
    this.errorMessage = message;
    this.isLoading = false;
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

  private isRentalType(value: unknown): value is 'With Driver' | 'Self Drive' {
    return ['With Driver', 'Self Drive'].includes(String(value));
  }

  private isTransmission(value: unknown): value is 'Automatic' | 'Manual' {
    return ['Automatic', 'Manual'].includes(String(value));
  }
}