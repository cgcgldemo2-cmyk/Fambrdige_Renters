import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

interface ReportActivity {
  date: string;
  reference: string;
  type: string;
  status: 'Completed' | 'Failed';
  count: string;
}

@Component({
  selector: 'app-recent-renter-report-activity',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './recent-renter-report-activity.component.html',
  styleUrls: ['./recent-renter-report-activity.component.scss']
})
export class RecentRenterReportActivityComponent {
  activities: ReportActivity[] = [
    {
      date: 'May 31, 2025',
      reference: 'RPT-2025-0531-001',
      type: 'Renter Verification Summary',
      status: 'Completed',
      count: '+52 records'
    },
    {
      date: 'May 30, 2025',
      reference: 'RPT-2025-0530-002',
      type: 'Renter Application Report',
      status: 'Completed',
      count: '+48 records'
    },
    {
      date: 'May 29, 2025',
      reference: 'RPT-2025-0529-003',
      type: 'Renter Document Report',
      status: 'Completed',
      count: '+61 records'
    },
    {
      date: 'May 28, 2025',
      reference: 'RPT-2025-0528-004',
      type: 'Renter Performance Summary',
      status: 'Completed',
      count: '+45 records'
    },
    {
      date: 'May 27, 2025',
      reference: 'RPT-2025-0527-005',
      type: 'Renter Verification Trend',
      status: 'Completed',
      count: '+39 records'
    }
  ];

  getStatusClass(status: ReportActivity['status']): string {
    return status.toLowerCase();
  }
}
