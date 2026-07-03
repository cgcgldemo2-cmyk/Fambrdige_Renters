import { CommonModule } from '@angular/common';
import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RenterPickupDatePickerComponent } from '../renter-pickup-date-picker/renter-pickup-date-picker.component';
import { RenterReturnDurationPickerComponent } from '../renter-return-duration-picker/renter-return-duration-picker.component';

interface PickupLocationOption {
  label: string;
  value: string;
}

@Component({
  selector: 'app-renter-top-search',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RenterPickupDatePickerComponent,
    RenterReturnDurationPickerComponent
  ],
  templateUrl: './renter-top-search.component.html',
  styleUrls: ['./renter-top-search.component.scss']
})
export class RenterTopSearchComponent {
  @Input() pickupLocation = '';
  @Input() startDate = '';
  @Input() endDate = '';
  @Input() pickupTime = '';
  @Input() returnTime = '';
  @Input() selectedSeats = '';
  @Input() selectedCarType = '';
  @Input() seatOptions: string[] = [];
  @Input() carTypeBySeats: { [key: string]: string[] } = {};
  @Input() isSearching = false;

  @Output() pickupLocationChange = new EventEmitter<string>();
  @Output() startDateChange = new EventEmitter<string>();
  @Output() endDateChange = new EventEmitter<string>();
  @Output() pickupTimeChange = new EventEmitter<string>();
  @Output() returnTimeChange = new EventEmitter<string>();
  @Output() selectAllVehiclesRequest = new EventEmitter<void>();
  @Output() selectSeatRequest = new EventEmitter<string>();
  @Output() selectCarTypeRequest = new EventEmitter<string>();
  @Output() searchRequest = new EventEmitter<void>();

  isVehicleDropdownOpen = false;

  pickupLocationOptions: PickupLocationOption[] = [
    { label: 'Makati City', value: 'Makati City' },
    { label: 'BGC, Taguig', value: 'BGC, Taguig' },
    { label: 'NAIA Terminal 1', value: 'NAIA Terminal 1' },
    { label: 'NAIA Terminal 2', value: 'NAIA Terminal 2' },
    { label: 'NAIA Terminal 3', value: 'NAIA Terminal 3' },
    { label: 'Quezon City', value: 'Quezon City' },
    { label: 'Pasay City', value: 'Pasay City' },
    { label: 'Cebu City', value: 'Cebu City' },
    { label: 'Davao City', value: 'Davao City' }
  ];

  readonly defaultCarTypes: string[] = [
    'Sedan', 'Hatchback', 'SUV', 'MPV', 'Van', 'Pickup', 'Sports Car', 'Coaster', 'Mini Bus', 'Bus'
  ];

  get selectedVehicleSummary(): string {
    return this.selectedCarType || 'All Vehicles';
  }

  get selectedSeatSummary(): string {
    return this.selectedSeats ? `${this.selectedSeats} seater` : 'Any seating capacity';
  }

  get canSearch(): boolean {
    return Boolean(
      this.pickupLocation.trim() &&
      this.startDate &&
      this.endDate &&
      this.pickupTime &&
      this.returnTime &&
      `${this.endDate}T${this.returnTime}` > `${this.startDate}T${this.pickupTime}`
    );
  }

  get availableCarTypesForDropdown(): string[] {
    return this.selectedSeats ? this.carTypeBySeats[this.selectedSeats] || [] : this.defaultCarTypes;
  }

  toggleVehicleDropdown(event: MouseEvent): void {
    event.stopPropagation();
    this.isVehicleDropdownOpen = !this.isVehicleDropdownOpen;
  }

  selectAllVehicles(event: MouseEvent): void {
    event.stopPropagation();
    this.selectAllVehiclesRequest.emit();
    this.isVehicleDropdownOpen = false;
  }

  selectSeat(seat: string, event: MouseEvent): void {
    event.stopPropagation();
    this.selectSeatRequest.emit(seat);
    this.isVehicleDropdownOpen = true;
  }

  selectCarType(type: string, event: MouseEvent): void {
    event.stopPropagation();
    this.selectCarTypeRequest.emit(type);
    this.isVehicleDropdownOpen = false;
  }

  getCarTypesBySeatLabel(seat: string): string {
    return (this.carTypeBySeats[seat] || []).join(', ') || 'No vehicle types';
  }

  updatePickupLocation(value: string): void {
    this.pickupLocation = value;
    this.pickupLocationChange.emit(value);
  }

  updateStartDate(value: string): void {
    this.startDate = value;
    this.startDateChange.emit(value);
  }

  updateEndDate(value: string): void {
    this.endDate = value;
    this.endDateChange.emit(value);
  }

  updatePickupTime(value: string): void {
    this.pickupTime = value;
    this.pickupTimeChange.emit(value);
  }

  updateReturnTime(value: string): void {
    this.returnTime = value;
    this.returnTimeChange.emit(value);
  }

  search(): void {
    if (!this.canSearch || this.isSearching) {
      return;
    }

    this.searchRequest.emit();
  }

  @HostListener('document:click')
  closeDropdown(): void {
    this.isVehicleDropdownOpen = false;
  }
}
