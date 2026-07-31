import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RenterVehiclePagination } from '../../../../services/renter-vehicle-search.service';

@Component({
  selector: 'app-results-pagination',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './results-pagination.component.html',
  styleUrls: ['./results-pagination.component.scss']
})
export class ResultsPaginationComponent {
  @Input() pagination: RenterVehiclePagination | null = null;
  @Output() pageChanged = new EventEmitter<number>();

  get pages(): number[] {
    if (!this.pagination) {
      return [];
    }
    const start = Math.max(1, this.pagination.current_page - 2);
    const end = Math.min(this.pagination.last_page, start + 4);
    return Array.from({ length: end - start + 1 }, (_, index) => start + index);
  }
}
