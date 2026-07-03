import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

type RentalType = 'with_driver' | 'without_driver';
type Transmission = 'Automatic' | 'Manual' | '';

interface InsuranceCoverageOption {
  value: string;
  label: string;
}

interface InsuranceCoverageChange {
  coverage: string;
  selected: boolean;
}

@Component({
  selector: 'app-renter-filters',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './renter-filters.component.html',
  styleUrls: ['./renter-filters.component.scss']
})
export class RenterFiltersComponent {
  @Input() showFilters = true;

  @Input() rentalType: RentalType = 'with_driver';
  @Input() seatOptions: string[] = [];
  @Input() selectedSeats = '';
  @Input() carTypes: string[] = [];
  @Input() selectedCarType = '';
  @Input() transmission: Transmission = '';

  @Input() insuranceCoverageOptions: InsuranceCoverageOption[] = [];
  @Input() selectedInsuranceCoverages: string[] = [];

  @Output() rentalTypeChange = new EventEmitter<RentalType>();
  @Output() seatChange = new EventEmitter<string>();
  @Output() carTypeChange = new EventEmitter<string>();
  @Output() transmissionChange = new EventEmitter<'Automatic' | 'Manual'>();
  @Output() insuranceCoverageChange = new EventEmitter<InsuranceCoverageChange>();

  isInsuranceCoverageSelected(coverage: string): boolean {
    return this.selectedInsuranceCoverages.includes(coverage);
  }

  toggleInsuranceCoverage(coverage: string, selected: boolean): void {
    this.insuranceCoverageChange.emit({ coverage, selected });
  }
}
