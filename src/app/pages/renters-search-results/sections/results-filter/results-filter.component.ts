import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-results-filter',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './results-filter.component.html',
  styleUrls: ['./results-filter.component.scss'],
})
export class ResultsFilterComponent {
  rentalTypes = ['All Rental Types', 'With Driver', 'Self Drive'];
  carTypes = [
    'All Types',
    'Hatchback',
    'Sedan',
    'MPV',
    'SUV',
    'Van',
  ];
  insuranceCoverages = [
    'All Coverage',
    'Comprehensive Insurance',
    'Personal Accident Coverage',
    'Third Party Liability Coverage',
    'Acts of Nature Coverage'
  ];
}
