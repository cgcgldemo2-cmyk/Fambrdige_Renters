import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PickupLocation, PickupLocationsService } from '../../../services/pickup-locations.service';
import { RenterVehicleSearchService } from '../../../services/renter-vehicle-search.service';

export interface BookingSearchData {
  code?: string;
  pickupLocationId?: number | null;
  pickupLocation: string;
  pickupCity: string;
  pickupDate: string;
  pickupTime: string;
  rentalDays: number;
  rentalType: string;
}

@Component({
  selector: 'app-booking-search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './booking-search.component.html',
  styleUrls: ['./booking-search.component.scss']
})
export class BookingSearchComponent implements OnInit {
  @Input() mode: 'form' | 'summary' = 'form';
  @Input() search: BookingSearchData = {
    pickupLocation: 'NAIA Terminal 3',
    pickupCity: 'Pasay, Metro Manila',
    pickupDate: '2026-07-08',
    pickupTime: '01:15',
    rentalDays: 2,
    rentalType: 'Self Drive'
  };
  @Output() searchSubmitted = new EventEmitter<BookingSearchData>();
  @Output() editSearch = new EventEmitter<void>();

  pickupKeyword = '';
  pickupLocations: PickupLocation[] = [];
  filteredPickupLocations: PickupLocation[] = [];
  selectedPickupLocation?: PickupLocation;
  showPickupSuggestions = false;
  isLoadingPickupLocations = false;
  pickupErrorMessage = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private pickupLocationsService: PickupLocationsService,
    private vehicleSearchService: RenterVehicleSearchService
  ) {}

  ngOnInit(): void {
    this.search.code = this.search.code
      || this.route.snapshot.queryParamMap.get('code')
      || this.vehicleSearchService.getConfiguredBusinessCode();
    this.pickupKeyword = this.search.pickupLocation || '';
    this.loadPickupLocations();
  }

  get summaryPickupDate(): string { return this.search.pickupDate || 'Not set'; }
  get summaryPickupTime(): string { return this.search.pickupTime || 'Not set'; }
  get summaryDateRange(): string { return `${this.search.rentalDays || 1} Day${this.search.rentalDays === 1 ? '' : 's'}`; }

  loadPickupLocations(): void {
    this.isLoadingPickupLocations = true;
    this.pickupErrorMessage = '';
    this.pickupLocationsService.getPickupLocations().subscribe({
      next: locations => {
        this.pickupLocations = locations;
        this.isLoadingPickupLocations = false;
      },
      error: (error: Error) => {
        this.pickupLocations = [];
        this.pickupErrorMessage = error.message || 'Pickup locations could not be loaded.';
        this.isLoadingPickupLocations = false;
      }
    });
  }

  onPickupInput(): void {
    const keyword = this.pickupKeyword.trim().toLowerCase();
    this.selectedPickupLocation = undefined;
    this.showPickupSuggestions = true;
    if (!keyword) { this.filteredPickupLocations = []; return; }
    this.filteredPickupLocations = this.pickupLocations.filter(location =>
      location.name.toLowerCase().includes(keyword) ||
      location.shortName.toLowerCase().includes(keyword) ||
      location.category.toLowerCase().includes(keyword) ||
      location.city.toLowerCase().includes(keyword) ||
      location.province.toLowerCase().includes(keyword) ||
      location.region.toLowerCase().includes(keyword)
    ).slice(0, 8);
  }

  selectPickupLocation(location: PickupLocation): void {
    this.selectedPickupLocation = location;
    this.pickupKeyword = `${location.shortName} - ${location.name}`;
    this.search.pickupLocation = location.shortName;
    this.search.pickupCity = `${location.city}, ${location.province}`;
    this.filteredPickupLocations = [];
    this.showPickupSuggestions = false;
  }

  hidePickupSuggestions(): void { setTimeout(() => this.showPickupSuggestions = false, 150); }
  increaseDays(): void { this.search.rentalDays++; }
  decreaseDays(): void { if (this.search.rentalDays > 1) this.search.rentalDays--; }
  onRentalDaysChange(): void { if (!this.search.rentalDays || this.search.rentalDays < 1) this.search.rentalDays = 1; }

  submitSearch(): void {
    const payload: BookingSearchData = {
      code: this.search.code,
      pickupLocationId: this.selectedPickupLocation?.id ?? this.search.pickupLocationId,
      pickupLocation: this.pickupKeyword,
      pickupCity: this.selectedPickupLocation
        ? `${this.selectedPickupLocation.city}, ${this.selectedPickupLocation.province}`
        : this.search.pickupCity || '',
      pickupDate: this.search.pickupDate,
      pickupTime: this.search.pickupTime,
      rentalDays: this.search.rentalDays,
      rentalType: this.search.rentalType
    };

    if (this.mode === 'form' && this.searchSubmitted.observed) {
      this.searchSubmitted.emit(payload);
      return;
    }

    this.router.navigate(['/renters/search-results'], {
      queryParams: payload
    });
  }
}
