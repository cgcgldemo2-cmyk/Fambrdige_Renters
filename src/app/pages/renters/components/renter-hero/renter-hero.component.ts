import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RenterTopSearchComponent } from '../../renter-top-search/renter-top-search.component';
import { TrustFeature } from '../../models/renter-page.models';

@Component({
  selector: 'app-renter-hero',
  standalone: true,
  imports: [CommonModule, RenterTopSearchComponent],
  templateUrl: './renter-hero.component.html',
  styleUrls: ['./renter-hero.component.scss']
})
export class RenterHeroComponent {
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
  @Input() trustFeatures: TrustFeature[] = [];

  @Output() pickupLocationChange = new EventEmitter<string>();
  @Output() startDateChange = new EventEmitter<string>();
  @Output() endDateChange = new EventEmitter<string>();
  @Output() pickupTimeChange = new EventEmitter<string>();
  @Output() returnTimeChange = new EventEmitter<string>();
  @Output() selectAllVehiclesRequest = new EventEmitter<void>();
  @Output() selectSeatRequest = new EventEmitter<string>();
  @Output() selectCarTypeRequest = new EventEmitter<string>();
  @Output() searchRequest = new EventEmitter<void>();
}
