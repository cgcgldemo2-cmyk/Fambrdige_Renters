import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PaymentMethod, RentalDuration, RenterVehicle } from '../../models/renter-page.models';

@Component({
  selector: 'app-renter-booking-panel',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './renter-booking-panel.component.html',
  styleUrls: ['./renter-booking-panel.component.scss']
})
export class RenterBookingPanelComponent {
  @Input() vehicle: RenterVehicle | null = null;
  @Input() startDate = '';
  @Input() endDate = '';
  @Input() pickupTime = '';
  @Input() returnTime = '';
  @Output() closed = new EventEmitter<void>();

  selectedDuration: RentalDuration = '24hrs';
  selectedPaymentMethod: PaymentMethod = 'gcash';
  bookingStep: 'booking' | 'payment' | 'success' = 'booking';

  get basePrice(): number {
    if (!this.vehicle) {
      return 0;
    }

    if (this.selectedDuration === '12hrs') {
      return this.vehicle.price12hrs;
    }

    if (this.selectedDuration === 'multi_day') {
      return this.vehicle.price24hrs * this.rentalDays;
    }

    return this.vehicle.price24hrs;
  }

  get driverFee(): number {
    if (!this.vehicle || this.vehicle.rentalType !== 'with_driver') {
      return 0;
    }

    if (this.selectedDuration === '12hrs') {
      return this.vehicle.withDriverSurcharge12hrs || 0;
    }

    const dailyFee = this.vehicle.withDriverSurcharge24hrs || 0;
    return this.selectedDuration === 'multi_day' ? dailyFee * this.rentalDays : dailyFee;
  }

  get totalPrice(): number {
    return this.basePrice + this.driverFee;
  }

  get reservationFee(): number {
    return Math.round(this.totalPrice * 0.2);
  }

  get serviceFee(): number {
    return Math.round(this.reservationFee * 0.02);
  }

  get payNow(): number {
    return this.reservationFee + this.serviceFee;
  }

  get balance(): number {
    return Math.max(this.totalPrice - this.reservationFee, 0);
  }

  get rentalDays(): number {
    if (!this.startDate || !this.endDate) {
      return 1;
    }

    const start = new Date(this.startDate);
    const end = new Date(this.endDate);
    const diff = Math.ceil((end.getTime() - start.getTime()) / 86400000);
    return Math.max(diff, 1);
  }

  selectDuration(duration: RentalDuration): void {
    this.selectedDuration = duration;
  }

  selectPaymentMethod(method: PaymentMethod): void {
    this.selectedPaymentMethod = method;
  }

  continueToPayment(): void {
    this.bookingStep = 'payment';
  }

  submitPayment(): void {
    this.bookingStep = 'success';
  }

  back(): void {
    this.bookingStep = 'booking';
  }
}
