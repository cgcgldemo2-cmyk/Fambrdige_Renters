import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { filter, Subscription } from 'rxjs';

export interface LessorSidebarMenuItem {
  label: string;
  route: string;
  icon: string;
  badge?: number | string;
  disabled?: boolean;
}

@Component({
  selector: 'app-lessor-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './lessor-sidebar.component.html',
  styleUrls: ['./lessor-sidebar.component.scss']
})
export class LessorSidebarComponent implements OnInit, OnDestroy {
  @Input() businessName = 'Juan Dela Cruz Car Rental';
  @Input() ownerInitials = 'JD';
  @Input() notificationCount = 3;
  @Input() activeRoute = '/dashboard';
  @Input() currentPageTitle = 'Dashboard';

  @Output() routeSelected = new EventEmitter<string>();

  isSidebarOpen = false;

  private routerSub?: Subscription;

  menuItems: LessorSidebarMenuItem[] = [
    {
      label: 'Dashboard',
      route: '/dashboard',
      icon: '▦'
    },
    {
      label: 'Booking Requests',
      route: '/booking-requests',
      icon: '▣',
      badge: 23
    },
    {
      label: 'Renters',
      route: '/renters',
      icon: '👥',
      badge: 8
    },
    {
      label: 'Vehicles',
      route: '/vehicles',
      icon: '🚘'
    },
    {
      label: 'Reservation Fees',
      route: '/reservation-fees',
      icon: '₱'
    },
    {
      label: 'API Usage',
      route: '/api-usage',
      icon: '</>'
    },
    {
      label: 'Verification Credits',
      route: '/verification-credits',
      icon: '🛡',
      disabled: true
    },
    {
      label: 'Reports',
      route: '/reports',
      icon: '▥',
      disabled: true
    },
    {
      label: 'Settings',
      route: '/settings',
      icon: '⚙',
      disabled: true
    }
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.syncPageState(this.router.url);

    this.routerSub = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(event => {
        const nav = event as NavigationEnd;
        this.syncPageState(nav.urlAfterRedirects);
      });
  }

  ngOnDestroy(): void {
    this.routerSub?.unsubscribe();
  }

  openSidebar(): void {
    this.isSidebarOpen = true;
  }

  closeSidebar(): void {
    this.isSidebarOpen = false;
  }

  goTo(route: string, disabled = false): void {
    if (disabled) {
      return;
    }

    this.routeSelected.emit(route);
    this.closeSidebar();
    this.router.navigateByUrl(route);
  }

  private syncPageState(url: string): void {
    const cleanUrl = url.split('?')[0].split('#')[0];

    const matchedItem = this.menuItems.find(item => {
      if (item.route === '/vehicles') {
        return cleanUrl === '/vehicles' ||
          cleanUrl === '/vehicles/new' ||
          cleanUrl.startsWith('/vehicles/');
      }

      return item.route === cleanUrl;
    });

    this.activeRoute = matchedItem?.route || cleanUrl;
    this.currentPageTitle = matchedItem?.label || this.formatTitle(cleanUrl);
  }

  private formatTitle(url: string): string {
    const path = url.replace('/', '');

    if (!path) {
      return 'Dashboard';
    }

    return path
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }
}
