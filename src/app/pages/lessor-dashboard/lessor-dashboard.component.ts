import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { LessorSidebarComponent } from '../../shared/components/lessor-sidebar/lessor-sidebar.component';

@Component({
  selector: 'app-lessor-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    LessorSidebarComponent
  ],
  templateUrl: './lessor-dashboard.component.html',
  styleUrls: ['./lessor-dashboard.component.scss']
})
export class LessorDashboardComponent {
  summaryCards = [
    {
      label: 'Pending Approval',
      value: '18',
      description: 'Booking requests waiting for review'
    },
    {
      label: 'Active Vehicles',
      value: '12',
      description: 'Vehicles available for renters'
    },
    {
      label: 'Reservation Fees',
      value: '₱48,500',
      description: 'Collected this month'
    },
    {
      label: 'API Requests',
      value: '8,420',
      description: 'Current billing cycle'
    }
  ];

  bookingRequests = [
    {
      renter: 'Juan Dela Cruz',
      vehicle: 'Ford Everest Titanium',
      date: 'Jul 18 - Jul 20, 2026',
      status: 'Pending Lessor Approval',
      fee: '₱1,500'
    },
    {
      renter: 'Maria Santos',
      vehicle: 'Toyota Vios',
      date: 'Jul 21, 2026',
      status: 'Documents Review',
      fee: '₱900'
    },
    {
      renter: 'Mark Reyes',
      vehicle: 'Toyota Hiace Grandia',
      date: 'Jul 22 - Jul 25, 2026',
      status: 'Pending Lessor Approval',
      fee: '₱2,000'
    }
  ];
}
