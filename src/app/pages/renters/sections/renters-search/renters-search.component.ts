import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

interface PickupLocation {
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

@Component({
  selector: 'app-renters-search',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './renters-search.component.html',
  styleUrls: ['./renters-search.component.scss']
})
export class RentersSearchComponent implements OnInit {
  pickupKeyword = '';
  pickupLocations: PickupLocation[] = [];
  filteredPickupLocations: PickupLocation[] = [];
  selectedPickupLocation?: PickupLocation;

  showPickupSuggestions = false;
  isLoadingPickupLocations = false;
  pickupErrorMessage = '';

  rentalDays = 1;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadPickupLocations();
  }

  loadPickupLocations(): void {
    this.isLoadingPickupLocations = true;
    this.pickupErrorMessage = '';

    this.http
      .get<PickupLocationResponse>('https://api.cgicsoftwaresolution.com/api/pickup-locations')
      .subscribe({
        next: (res) => {
          if (res.success && res.data.length > 0) {
            this.pickupLocations = res.data.filter(location => location.isActive);
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

    if (!keyword) {
      this.filteredPickupLocations = [];
      return;
    }

    this.filteredPickupLocations = this.pickupLocations
      .filter(location =>
        location.name.toLowerCase().includes(keyword) ||
        location.shortName.toLowerCase().includes(keyword) ||
        location.category.toLowerCase().includes(keyword) ||
        location.city.toLowerCase().includes(keyword) ||
        location.province.toLowerCase().includes(keyword) ||
        location.region.toLowerCase().includes(keyword)
      )
      .slice(0, 8);
  }

  selectPickupLocation(location: PickupLocation): void {
    this.selectedPickupLocation = location;
    this.pickupKeyword = `${location.shortName} - ${location.name}`;
    this.filteredPickupLocations = [];
    this.showPickupSuggestions = false;
  }

  hidePickupSuggestions(): void {
    setTimeout(() => {
      this.showPickupSuggestions = false;
    }, 150);
  }

  increaseDays(): void {
    this.rentalDays++;
  }

  decreaseDays(): void {
    if (this.rentalDays > 1) {
      this.rentalDays--;
    }
  }

  onRentalDaysChange(): void {
    if (!this.rentalDays || this.rentalDays < 1) {
      this.rentalDays = 1;
    }
  }

  searchCars(): void {
    console.log({
      pickupLocationId: this.selectedPickupLocation?.id || null,
      pickupLocation: this.pickupKeyword,
      rentalDays: this.rentalDays
    });
  }
}
