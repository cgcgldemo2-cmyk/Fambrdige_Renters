import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RenterSearchContext } from '../../../models/renter-journey.models';
import { PickupLocation, PickupLocationsService } from '../../../services/pickup-locations.service';
import { RenterVehicleSearchService } from '../../../services/renter-vehicle-search.service';

export interface BookingSearchData extends RenterSearchContext {}

@Component({
  selector: 'app-booking-search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './booking-search.component.html',
  styleUrls: ['./booking-search.component.scss']
})
export class BookingSearchComponent implements OnInit {
  @Input() mode: 'form' | 'summary' = 'form';
  @Input() search: BookingSearchData = this.createDefaultSearch();
  @Output() searchSubmitted = new EventEmitter<BookingSearchData>();
  @Output() editSearch = new EventEmitter<void>();

  readonly minPickupDate = this.toDateInput(new Date());
  pickupKeyword = '';
  pickupLocations: PickupLocation[] = [];
  filteredPickupLocations: PickupLocation[] = [];
  selectedPickupLocation?: PickupLocation;
  showPickupSuggestions = false;
  isLoadingPickupLocations = false;
  isSubmitting = false;
  pickupErrorMessage = '';
  validationMessage = '';

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly pickupLocationsService: PickupLocationsService,
    private readonly vehicleSearchService: RenterVehicleSearchService
  ) {}

  ngOnInit(): void {
    this.search.code = this.search.code
      || this.route.snapshot.queryParamMap.get('code')
      || this.vehicleSearchService.getConfiguredBusinessCode();
    this.pickupKeyword = this.search.pickupLocation || '';
    if (!this.search.pickupDate) this.search.pickupDate = this.minPickupDate;
    if (!this.search.pickupTime) this.search.pickupTime = '09:00';
    if (!this.search.rentalDays || this.search.rentalDays < 1) this.search.rentalDays = 1;
    this.updateReturnFromDuration();
    this.loadPickupLocations();
  }

  get summaryPickupDate(): string { return this.search.pickupDate || 'Not set'; }
  get summaryPickupTime(): string { return this.search.pickupTime || 'Not set'; }
  get summaryDateRange(): string { return `${this.search.pickupDate} to ${this.search.returnDate}`; }

  loadPickupLocations(): void {
    this.isLoadingPickupLocations = true;
    this.pickupErrorMessage = '';
    this.pickupLocationsService.getPickupLocations().subscribe({
      next: locations => {
        this.pickupLocations = locations;
        this.filteredPickupLocations = locations.slice(0, 8);
        this.isLoadingPickupLocations = false;
      },
      error: (error: Error) => {
        this.pickupLocations = [];
        this.filteredPickupLocations = [];
        this.pickupErrorMessage = error.message || 'Pickup locations could not be loaded.';
        this.isLoadingPickupLocations = false;
      }
    });
  }

  onPickupInput(): void {
    const keyword = this.pickupKeyword.trim().toLowerCase();
    if (this.selectedPickupLocation && this.pickupKeyword !== this.locationLabel(this.selectedPickupLocation)) {
      this.selectedPickupLocation = undefined;
      this.search.pickupLocationId = null;
    }
    this.showPickupSuggestions = true;
    this.filteredPickupLocations = (keyword
      ? this.pickupLocations.filter(location => this.matchesLocation(location, keyword))
      : this.pickupLocations
    ).slice(0, 8);
  }

  selectPickupLocation(location: PickupLocation): void {
    this.selectedPickupLocation = location;
    this.pickupKeyword = this.locationLabel(location);
    this.search.pickupLocationId = location.id;
    this.search.pickupLocation = this.pickupKeyword;
    this.search.pickupCity = [location.city, location.province].filter(Boolean).join(', ');
    this.validationMessage = '';
    this.showPickupSuggestions = false;
  }

  hidePickupSuggestions(): void {
    setTimeout(() => this.showPickupSuggestions = false, 150);
  }

  increaseDays(): void {
    this.search.rentalDays++;
    this.updateReturnFromDuration();
  }

  decreaseDays(): void {
    if (this.search.rentalDays > 1) this.search.rentalDays--;
    this.updateReturnFromDuration();
  }

  onRentalDaysChange(): void {
    if (!this.search.rentalDays || this.search.rentalDays < 1) this.search.rentalDays = 1;
    this.updateReturnFromDuration();
  }

  onPickupScheduleChange(): void {
    this.updateReturnFromDuration();
    this.validationMessage = '';
  }

  onReturnScheduleChange(): void {
    const start = this.scheduleDate(this.search.pickupDate, this.search.pickupTime);
    const end = this.scheduleDate(this.search.returnDate, this.search.returnTime);
    if (start && end && end > start) {
      this.search.rentalDays = Math.max(1, Math.ceil((end.getTime() - start.getTime()) / 86_400_000));
      this.validationMessage = '';
    }
  }

  submitSearch(): void {
    const error = this.validate();
    if (error) {
      this.validationMessage = error;
      return;
    }

    const payload: BookingSearchData = {
      ...this.search,
      pickupLocationId: this.selectedPickupLocation?.id ?? this.search.pickupLocationId,
      pickupLocation: this.pickupKeyword.trim(),
      pickupCity: this.selectedPickupLocation
        ? [this.selectedPickupLocation.city, this.selectedPickupLocation.province].filter(Boolean).join(', ')
        : this.search.pickupCity || ''
    };

    this.isSubmitting = true;
    if (this.searchSubmitted.observed) {
      this.searchSubmitted.emit(payload);
      this.isSubmitting = false;
      return;
    }

    this.router.navigate(['/renters/search-results'], { queryParams: payload })
      .finally(() => this.isSubmitting = false);
  }

  private validate(): string {
    if (!this.pickupKeyword.trim()) return 'Select a pickup location.';
    if (!this.search.pickupLocationId) return 'Choose a pickup location from the available suggestions.';
    const start = this.scheduleDate(this.search.pickupDate, this.search.pickupTime);
    const end = this.scheduleDate(this.search.returnDate, this.search.returnTime);
    if (!start) return 'Choose a valid pickup date and time.';
    if (start.getTime() < Date.now() - 60_000) return 'Pickup date and time must be in the future.';
    if (!end || end <= start) return 'Return date and time must be after pickup.';
    return '';
  }

  private updateReturnFromDuration(): void {
    const start = this.scheduleDate(this.search.pickupDate, this.search.pickupTime);
    if (!start) return;
    const end = new Date(start);
    end.setDate(end.getDate() + Math.max(1, this.search.rentalDays));
    this.search.returnDate = this.toDateInput(end);
    this.search.returnTime = this.search.pickupTime;
  }

  private scheduleDate(date: string, time: string): Date | null {
    if (!date || !time) return null;
    const value = new Date(`${date}T${time}:00`);
    return Number.isNaN(value.getTime()) ? null : value;
  }

  private matchesLocation(location: PickupLocation, keyword: string): boolean {
    return [location.name, location.shortName, location.category, location.city, location.province, location.region]
      .some(value => value.toLowerCase().includes(keyword));
  }

  private locationLabel(location: PickupLocation): string {
    return location.shortName === location.name ? location.name : `${location.shortName} - ${location.name}`;
  }

  private createDefaultSearch(): BookingSearchData {
    const pickup = new Date();
    pickup.setDate(pickup.getDate() + 1);
    const pickupDate = this.toDateInput(pickup);
    const returned = new Date(pickup);
    returned.setDate(returned.getDate() + 1);
    return {
      pickupLocation: '',
      pickupCity: '',
      pickupDate,
      pickupTime: '09:00',
      returnDate: this.toDateInput(returned),
      returnTime: '09:00',
      rentalDays: 1,
      rentalType: 'Self Drive'
    };
  }

  private toDateInput(value: Date): string {
    const pad = (part: number) => String(part).padStart(2, '0');
    return `${value.getFullYear()}-${pad(value.getMonth() + 1)}-${pad(value.getDate())}`;
  }
}