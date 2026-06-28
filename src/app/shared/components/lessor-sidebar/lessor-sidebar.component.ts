import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

export interface LessorSidebarMenuItem {
  label: string;
  route: string;
  icon: string;
  badge?: number | string;
}

@Component({
  selector: 'app-lessor-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './lessor-sidebar.component.html',
  styleUrls: ['./lessor-sidebar.component.scss']
})
export class LessorSidebarComponent {
  @Input() businessName = 'Juan Dela Cruz Car Rental';
  @Input() ownerInitials = 'JD';
  @Input() notificationCount = 3;
  @Input() activeRoute = '/lessor/dashboard';
  @Input() currentPageTitle = 'Dashboard';

  @Output() routeSelected = new EventEmitter<string>();

  isSidebarOpen = false;

  menuItems: LessorSidebarMenuItem[] = [
    {
      label: 'Dashboard',
      route: '/lessor/dashboard',
      icon: '▦'
    },
    {
      label: 'Booking Requests',
      route: '/lessor/booking-requests',
      icon: '▣',
      badge: 23
    },
    {
      label: 'Renter Approvals',
      route: '/lessor/renter-approvals',
      icon: '👥',
      badge: 8
    },
    {
      label: 'Vehicles',
      route: '/lessor/vehicles',
      icon: '🚘'
    },
    {
      label: 'Reservation Fees',
      route: '/lessor/reservation-fees',
      icon: '₱'
    },
    {
      label: 'Payouts',
      route: '/lessor/payouts',
      icon: '▤'
    },
    {
      label: 'API Usage',
      route: '/lessor/api-usage',
      icon: '</>'
    },
    {
      label: 'Verification Credits',
      route: '/lessor/verification-credits',
      icon: '🛡'
    },
    {
      label: 'Reports',
      route: '/lessor/reports',
      icon: '▥'
    },
    {
      label: 'Settings',
      route: '/lessor/settings',
      icon: '⚙'
    }
  ];

  constructor(private router: Router) {}

  openSidebar(): void {
    this.isSidebarOpen = true;
  }

  closeSidebar(): void {
    this.isSidebarOpen = false;
  }

  goTo(route: string): void {
    this.activeRoute = route;
    this.routeSelected.emit(route);
    this.closeSidebar();

    // Keep this safe. If routes are not created yet, the emit still works.
    this.router.navigateByUrl(route).catch(() => {
      console.log('Route not created yet:', route);
    });
  }
}
