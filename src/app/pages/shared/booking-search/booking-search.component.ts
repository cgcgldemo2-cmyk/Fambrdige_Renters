import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

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

interface PickupLocationResponse {
  success: boolean;
  message: string;
  data: PickupLocation[];
}

export interface BookingSearchData {
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
  imports: [CommonModule, FormsModule, HttpClientModule],
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

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.pickupKeyword = this.search.pickupLocation || '';
    this.loadPickupLocations();
  }

  get summaryPickupDate(): string { return this.search.pickupDate || 'Not set'; }
  get summaryPickupTime(): string { return this.search.pickupTime || 'Not set'; }
  get summaryDateRange(): string { return `${this.search.rentalDays || 1} Day${this.search.rentalDays === 1 ? '' : 's'}`; }

  loadPickupLocations(): void {
    this.isLoadingPickupLocations = true;
    this.pickupErrorMessage = '';
    this.http.get<PickupLocationResponse>('https://api.cgicsoftwaresolution.com/api/pickup-locations').subscribe({
      next: (res) => {
        if (res.success && res.data.length > 0) {
          this.pickupLocations = res.data.filter(x => x.isActive);
        } else {
          this.pickupLocations = [];
          this.pickupErrorMessage = res.message || 'No Location Found.';
        }
        this.isLoadingPickupLocations = false;
      },
      error: () => {
        this.pickupLocations = [];
        this.pickupErrorMessage = 'Something went wrong.';
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
      pickupLocationId: this.selectedPickupLocation?.id,
      pickupLocation: this.pickupKeyword,
      pickupCity: this.selectedPickupLocation
        ? `${this.selectedPickupLocation.city}, ${this.selectedPickupLocation.province}`
        : this.search.pickupCity || '',
      pickupDate: this.search.pickupDate,
      pickupTime: this.search.pickupTime,
      rentalDays: this.search.rentalDays,
      rentalType: this.search.rentalType
    };

    console.log('this.mode:', this.mode);
    console.log('this.searchSubmitted.observed:', this.searchSubmitted.observed);
    if (this.mode === 'form' && this.searchSubmitted.observed) {
      this.searchSubmitted.emit(payload);
      return;
    }

    this.router.navigate(['/renters/search-results'], {
      queryParams: payload
    });
  }
}
