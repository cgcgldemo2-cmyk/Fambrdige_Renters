import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { PickupLocation, PickupLocationsService } from '../../../../services/pickup-locations.service';

@Component({
  selector: 'app-renters-search',
  standalone: true,
  imports: [CommonModule, FormsModule],
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

  constructor(
    private pickupLocationsService: PickupLocationsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadPickupLocations();
  }

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
    this.router.navigate(['/renters/search-results'], {
      queryParams: {
        pickupLocationId: this.selectedPickupLocation?.id || '',
        pickupLocation: this.pickupKeyword,
        rentalDays: this.rentalDays
      }
    });
  }
}
