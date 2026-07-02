import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-confirmed-bookings',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './confirmed-bookings.component.html',
  styleUrls: ['./confirmed-bookings.component.scss']
})
export class ConfirmedBookingsComponent {}
