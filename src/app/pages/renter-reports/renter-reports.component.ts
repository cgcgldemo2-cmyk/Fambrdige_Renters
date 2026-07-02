import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReportFiltersComponent, RenterReportFilters } from './components/report-filters/report-filters.component';
import { TotalRenterApplicationsComponent } from './components/total-renter-applications/total-renter-applications.component';
import { VerifiedRentersComponent } from './components/verified-renters/verified-renters.component';
import { PendingReviewComponent } from './components/pending-review/pending-review.component';
import { ApprovalRateComponent } from './components/approval-rate/approval-rate.component';
import { RenterApplicationTrendComponent } from './components/renter-application-trend/renter-application-trend.component';
import { VerificationStatusBreakdownComponent } from './components/verification-status-breakdown/verification-status-breakdown.component';
import { TopSubmittedDocumentsComponent } from './components/top-submitted-documents/top-submitted-documents.component';
import { RenterInsightsComponent } from './components/renter-insights/renter-insights.component';
import { RecentRenterReportActivityComponent } from './components/recent-renter-report-activity/recent-renter-report-activity.component';
import { TopCitiesByApplicationsComponent } from './components/top-cities-by-applications/top-cities-by-applications.component';
import { LessorSidebarComponent } from '../../shared/components/lessor-sidebar/lessor-sidebar.component';

@Component({
  selector: 'app-renter-reports',
  standalone: true,
  imports: [
    CommonModule,
    ReportFiltersComponent,
    TotalRenterApplicationsComponent,
    VerifiedRentersComponent,
    PendingReviewComponent,
    ApprovalRateComponent,
    RenterApplicationTrendComponent,
    VerificationStatusBreakdownComponent,
    TopSubmittedDocumentsComponent,
    RenterInsightsComponent,
    RecentRenterReportActivityComponent,
    TopCitiesByApplicationsComponent,
    LessorSidebarComponent
  ],
  templateUrl: './renter-reports.component.html',
  styleUrls: ['./renter-reports.component.scss']
})
export class RenterReportsComponent {
  currentFilters: RenterReportFilters = {
    dateRange: 'May 1 – May 31, 2025',
    reportType: 'All Reports',
    verificationStatus: 'All Statuses',
    location: 'All Locations'
  };

  onFiltersChanged(filters: RenterReportFilters): void {
    this.currentFilters = filters;
  }

  exportReports(format: 'pdf' | 'csv'): void {
    console.log(`Export renter reports as ${format.toUpperCase()}`, this.currentFilters);
  }
}
