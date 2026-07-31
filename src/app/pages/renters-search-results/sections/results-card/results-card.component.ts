import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RenterVehicle } from '../../../../services/renter-vehicle-search.service';
import { BookingSearchData } from '../../../shared/booking-search/booking-search.component';

@Component({
  selector: 'app-results-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './results-card.component.html',
  styleUrls: ['./results-card.component.scss']
})
export class ResultsCardComponent {
  @Input() car!: RenterVehicle;
  @Input() search!: BookingSearchData;

  get dailyPrice(): number {
    return Number(this.car.price_24hrs || 0);
  }

  get totalPrice(): number {
    const calculated = this.car.calculated_price;
    if (!calculated) {
      return this.dailyPrice * this.search.rentalDays;
    }
    return this.search.rentalType === 'With Driver'
      ? Number(calculated.estimated_total_with_driver)
      : Number(calculated.estimated_total_without_driver);
  }

  get rentalTypeLabel(): string {
    if (this.car.rental_type === 'both') {
      return 'With or without driver';
    }
    return this.car.rental_type === 'with_driver' ? 'With driver' : 'Self drive';
  }
}
