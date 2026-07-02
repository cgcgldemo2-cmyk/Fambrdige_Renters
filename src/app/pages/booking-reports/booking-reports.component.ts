import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BookingReportFiltersComponent } from './components/booking-report-filters/booking-report-filters.component';
import { TotalBookingsComponent } from './components/total-bookings/total-bookings.component';
import { ConfirmedBookingsComponent } from './components/confirmed-bookings/confirmed-bookings.component';
import { PendingBookingsComponent } from './components/pending-bookings/pending-bookings.component';
import { BookingRevenueComponent } from './components/booking-revenue/booking-revenue.component';
import { BookingTrendComponent } from './components/booking-trend/booking-trend.component';
import { BookingStatusBreakdownComponent } from './components/booking-status-breakdown/booking-status-breakdown.component';
import { TopBookingLocationsComponent } from './components/top-booking-locations/top-booking-locations.component';
import { BookingInsightsComponent } from './components/booking-insights/booking-insights.component';
import { RecentBookingReportActivityComponent } from './components/recent-booking-report-activity/recent-booking-report-activity.component';
import { TopVehiclesByBookingComponent } from './components/top-vehicles-by-booking/top-vehicles-by-booking.component';
import { LessorSidebarComponent } from '../../shared/components/lessor-sidebar/lessor-sidebar.component';

@Component({
  selector: 'app-booking-reports',
  standalone: true,
  imports: [
    CommonModule,
    BookingReportFiltersComponent,
    TotalBookingsComponent,
    ConfirmedBookingsComponent,
    PendingBookingsComponent,
    BookingRevenueComponent,
    BookingTrendComponent,
    BookingStatusBreakdownComponent,
    TopBookingLocationsComponent,
    BookingInsightsComponent,
    RecentBookingReportActivityComponent,
    TopVehiclesByBookingComponent,
    LessorSidebarComponent
  ],
  templateUrl: './booking-reports.component.html',
  styleUrls: ['./booking-reports.component.scss']
})
export class BookingReportsComponent {}
