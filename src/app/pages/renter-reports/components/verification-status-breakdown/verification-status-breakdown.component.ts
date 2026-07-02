import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

interface StatusItem {
  label: string;
  value: number;
  percentage: number;
  colorClass: string;
}

@Component({
  selector: 'app-verification-status-breakdown',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './verification-status-breakdown.component.html',
  styleUrls: ['./verification-status-breakdown.component.scss']
})
export class VerificationStatusBreakdownComponent {
  total = 1842;

  statuses: StatusItem[] = [
    { label: 'Approved', value: 1286, percentage: 69.8, colorClass: 'approved' },
    { label: 'Pending', value: 214, percentage: 11.6, colorClass: 'pending' },
    { label: 'Rejected', value: 342, percentage: 18.6, colorClass: 'rejected' }
  ];
}
