import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

interface BookingReportActivity {
  date: string;
  reference: string;
  type: string;
  status: 'Completed' | 'Failed';
  value: string;
}

@Component({
  selector: 'app-recent-booking-report-activity',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './recent-booking-report-activity.component.html',
  styleUrls: ['./recent-booking-report-activity.component.scss']
})
export class RecentBookingReportActivityComponent {
  activities: BookingReportActivity[] = [
    { date: 'May 31, 2025', reference: 'RPT-BOOK-0531-001', type: 'Booking Summary', status: 'Completed', value: '+84 bookings' },
    { date: 'May 30, 2025', reference: 'RPT-BOOK-0530-002', type: 'Revenue Report', status: 'Completed', value: '₱58,200' },
    { date: 'May 29, 2025', reference: 'RPT-BOOK-0529-003', type: 'Cancellation Report', status: 'Completed', value: '12 cancelled' },
    { date: 'May 28, 2025', reference: 'RPT-BOOK-0528-004', type: 'Location Report', status: 'Completed', value: '+42 records' },
    { date: 'May 27, 2025', reference: 'RPT-BOOK-0527-005', type: 'Vehicle Demand', status: 'Failed', value: '—' }
  ];
}
