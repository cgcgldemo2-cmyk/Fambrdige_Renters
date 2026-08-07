import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RenterHomeContentService } from '../../services/renter-home-content.service';
import { BookingSearchData } from '../shared/booking-search/booking-search.component';
import { RentersSharedModule } from './renters-shared.module';

@Component({ selector: 'app-renters', standalone: true, imports: [CommonModule, RentersSharedModule], templateUrl: './renters.component.html', styleUrls: ['./renters.component.scss'] })
export class RentersComponent {
  private readonly contentService = inject(RenterHomeContentService);
  readonly store = this.contentService.store;
  readonly cars = this.contentService.vehiclePreviews;
  readonly reviews = this.contentService.reviewPreviews;
  readonly search = this.createDefaultSearch();
  private createDefaultSearch(): BookingSearchData {
    const pickup = new Date(); pickup.setDate(pickup.getDate() + 1);
    const returned = new Date(pickup); returned.setDate(returned.getDate() + 1);
    return { pickupLocation: '', pickupCity: '', pickupDate: this.toDate(pickup), pickupTime: '09:00', returnDate: this.toDate(returned), returnTime: '09:00', rentalDays: 1, rentalType: 'Self Drive' };
  }
  private toDate(value: Date): string {
    const pad = (part: number) => String(part).padStart(2, '0');
    return `${value.getFullYear()}-${pad(value.getMonth() + 1)}-${pad(value.getDate())}`;
  }
}
