import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RenterVehicle } from '../../models/renter-page.models';

@Component({
  selector: 'app-renter-search-results',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './renter-search-results.component.html',
  styleUrls: ['./renter-search-results.component.scss']
})
export class RenterSearchResultsComponent {
  @Input() vehicles: RenterVehicle[] = [];
  @Input() isSearching = false;
  @Input() errorMessage = '';
  @Input() hasSearched = false;
  @Input() loadedVehicleCount = 0;
  @Input() hasInsuranceFilters = false;
  @Output() bookNow = new EventEmitter<RenterVehicle>();
}
