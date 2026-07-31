import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, Subscription, takeUntil } from 'rxjs';
import {
  RenterVehicle,
  RenterVehiclePagination,
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
    console.log('onSearchUpdated', updatedSearch);
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
    if (!this.pagination || page < 1 || page > this.pagination.lastPage || page === this.pagination.currentPage) {
      return;
    }
    this.updateResultQuery({ page });
  }

  retrySearch(): void {
    this.loadVehicles(this.pagination?.currentPage || this.toPositiveNumber(this.route.snapshot.queryParamMap.get('page')) || 1);
  }

  private loadVehicles(page: number): void {
    if (!this.search.code) {
      this.errorMessage = 'This rental business is not configured for vehicle search.';
      this.cars = [];
      this.pagination = null;
      return;
    }
    if (!this.search.pickupDate || !this.search.pickupTime) {
      this.errorMessage = 'Choose a pickup date and time to search available vehicles.';
      this.cars = [];
      this.pagination = null;
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    this.activeSearch?.unsubscribe();
    this.activeSearch = this.vehicleSearchService.search({
      code: this.search.code,
      pickupLocationId: this.search.pickupLocationId || undefined,
      pickupDate: this.search.pickupDate,
      pickupTime: this.search.pickupTime,
      rentalDays: this.search.rentalDays,
      rentalType: this.search.rentalType,
      sortBy: this.sortBy,
      page,
      perPage: 10
    }).pipe(takeUntil(this.destroy$)).subscribe({
      next: response => {
        this.cars = response.vehicles;
        this.pagination = response.pagination;
        this.store = { ...this.store, name: response.lessor.name };
        this.isLoading = false;
      },
      error: (error: Error) => {
        this.cars = [];
        this.pagination = null;
        this.errorMessage = error.message;
        this.isLoading = false;
      }
    });
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

}
