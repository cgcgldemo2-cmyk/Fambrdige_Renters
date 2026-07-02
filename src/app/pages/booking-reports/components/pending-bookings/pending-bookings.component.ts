import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-pending-bookings',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pending-bookings.component.html',
  styleUrls: ['./pending-bookings.component.scss']
})
export class PendingBookingsComponent {}
