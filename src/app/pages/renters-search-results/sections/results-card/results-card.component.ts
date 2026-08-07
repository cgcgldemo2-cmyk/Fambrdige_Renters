import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { RenterJourneyService } from '../../../../services/renter-journey.service';
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

  constructor(
    private readonly journeyService: RenterJourneyService,
    private readonly router: Router
  ) {}

  get dailyPrice(): number { return this.car.price24Hours; }

  get totalPrice(): number {
    const calculated = this.car.calculatedPrice;
    if (!calculated) return this.dailyPrice * this.search.rentalDays;
    return this.search.rentalType === 'With Driver'
      ? calculated.estimatedTotalWithDriver
      : calculated.estimatedTotalWithoutDriver;
  }

  get rentalTypeLabel(): string {
    if (this.car.rentalType === 'both') return 'With or without driver';
    return this.car.rentalType === 'with_driver' ? 'With driver' : 'Self drive';
  }

  viewDetails(): void {
    this.journeyService.rememberVehicle(this.car, this.search, this.totalPrice);
    this.router.navigate(['/vehicles', this.car.id], { queryParams: { ...this.search } });
  }
}