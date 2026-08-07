import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

export interface RenterResultsFilter {
  rentalType: '' | 'With Driver' | 'Self Drive';
  vehicleType: string;
  transmission: '' | 'Automatic' | 'Manual';
  maxPrice: number | null;
}

@Component({
  selector: 'app-results-filter',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './results-filter.component.html',
  styleUrls: ['./results-filter.component.scss']
})
export class ResultsFilterComponent implements OnChanges {
  @Input() filters: RenterResultsFilter = this.emptyFilters();
  @Output() filtersApplied = new EventEmitter<RenterResultsFilter>();

  draft = this.emptyFilters();
  readonly carTypes = ['Hatchback', 'Sedan', 'MPV', 'SUV', 'Van', 'Pickup'];

  ngOnChanges(): void {
    this.draft = { ...this.filters };
  }

  apply(): void {
    this.filtersApplied.emit({ ...this.draft, maxPrice: this.draft.maxPrice ? Number(this.draft.maxPrice) : null });
  }

  clear(): void {
    this.draft = this.emptyFilters();
    this.filtersApplied.emit({ ...this.draft });
  }

  private emptyFilters(): RenterResultsFilter {
    return { rentalType: '', vehicleType: '', transmission: '', maxPrice: null };
  }
}