import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-booking-status-breakdown',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './booking-status-breakdown.component.html',
  styleUrls: ['./booking-status-breakdown.component.scss']
})
export class BookingStatusBreakdownComponent {
  total = 2416;

  status = [
    { label: 'Confirmed', value: 1932, percent: '80.0%', className: 'green' },
    { label: 'Pending', value: 284, percent: '11.8%', className: 'orange' },
    { label: 'Cancelled', value: 126, percent: '5.2%', className: 'red' },
    { label: 'Completed', value: 74, percent: '3.0%', className: 'blue' }
  ];
}
