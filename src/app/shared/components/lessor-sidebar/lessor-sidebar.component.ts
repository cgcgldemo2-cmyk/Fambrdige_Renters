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
  children?: LessorSidebarMenuItem[];
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
  expandedMenus = new Set<string>();

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
      icon: '💳',
      route: '/verification-credits'
    },
    {
      label: 'Reports',
      route: '/reports',
      icon: '▥',
      children: [
        {
          label: 'Renters',
          route: '/reports/renters',
          icon: '👥'
        }
      ]
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

  toggleSubmenu(label: string): void {
    if (this.expandedMenus.has(label)) {
      this.expandedMenus.delete(label);
    } else {
      this.expandedMenus.add(label);
    }
  }

  isSubmenuExpanded(label: string): boolean {
    return this.expandedMenus.has(label);
  }

  isMenuItemActive(item: LessorSidebarMenuItem): boolean {
    if (item.route === this.activeRoute) {
      return true;
    }
    if (item.children) {
      return item.children.some(child => child.route === this.activeRoute);
    }
    return false;
  }

  private syncPageState(url: string): void {
    const cleanUrl = url.split('?')[0].split('#')[0];

    let matchedItem: LessorSidebarMenuItem | undefined;
    let matchedChild: LessorSidebarMenuItem | undefined;

    // Search in all items and their children
    for (const item of this.menuItems) {
      if (item.route === '/vehicles') {
        if (cleanUrl === '/vehicles' ||
          cleanUrl === '/vehicles/new' ||
          cleanUrl.startsWith('/vehicles/')) {
          matchedItem = item;
          break;
        }
      } else if (item.route === cleanUrl) {
        matchedItem = item;
        break;
      }

      // Check children
      if (item.children) {
        const child = item.children.find(child => child.route === cleanUrl);
        if (child) {
          matchedItem = item;
          matchedChild = child;
          this.expandedMenus.add(item.label);
          break;
        }
      }
    }

    this.activeRoute = matchedChild?.route || matchedItem?.route || cleanUrl;
    this.currentPageTitle = matchedChild?.label || matchedItem?.label || this.formatTitle(cleanUrl);
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
