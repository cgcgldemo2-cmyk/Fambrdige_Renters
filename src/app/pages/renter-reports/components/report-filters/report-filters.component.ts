import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

export interface RenterReportFilters {
  dateRange: string;
  reportType: string;
  verificationStatus: string;
  location: string;
}

@Component({
  selector: 'app-report-filters',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './report-filters.component.html',
  styleUrls: ['./report-filters.component.scss']
})
export class ReportFiltersComponent {
  @Output() filtersChanged = new EventEmitter<RenterReportFilters>();
  @Output() exportRequested = new EventEmitter<'pdf' | 'csv'>();

  filters: RenterReportFilters = {
    dateRange: 'May 1 – May 31, 2025',
    reportType: 'All Reports',
    verificationStatus: 'All Statuses',
    location: 'All Locations'
  };

  dateRanges = [
    'May 1 – May 31, 2025',
    'Apr 1 – Apr 30, 2025',
    'Last 7 Days',
    'Last 30 Days'
  ];

  reportTypes = [
    'All Reports',
    'Renter Verification Summary',
    'Renter Application Report',
    'Renter Document Report',
    'Renter Performance Summary'
  ];

  statuses = [
    'All Statuses',
    'Approved',
    'Pending',
    'Rejected'
  ];

  locations = [
    'All Locations',
    'Manila',
    'Cebu',
    'Davao',
    'Baguio',
    'Iloilo'
  ];

  emitFilters(): void {
    this.filtersChanged.emit({ ...this.filters });
  }

  export(format: 'pdf' | 'csv'): void {
    this.exportRequested.emit(format);
  }
}
