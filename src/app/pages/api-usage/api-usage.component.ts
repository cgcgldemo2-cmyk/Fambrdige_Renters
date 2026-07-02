import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LessorSidebarComponent } from '../../shared/components/lessor-sidebar/lessor-sidebar.component';

type ApiStatus = 'Success' | 'Failed' | 'Warning';
type ApiMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

interface ApiLogRecord {
  id: number;
  requestId: string;
  requestDate: string;
  endpoint: string;
  method: ApiMethod;
  module: string;
  status: ApiStatus;
  statusCode: number;
  durationMs: number;
  apiCredits: number;
  clientApp: string;
  ipAddress: string;
  payload: string;
  response: string;
  errorMessage?: string;
}

interface EndpointUsage {
  endpoint: string;
  module: string;
  totalRequests: number;
  successCount: number;
  failedCount: number;
  avgDurationMs: number;
  creditsUsed: number;
}

@Component({
  selector: 'app-api-usage',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    LessorSidebarComponent
  ],
  templateUrl: './api-usage.component.html',
  styleUrls: ['./api-usage.component.scss']
})
export class ApiUsageComponent {
  returningLogId: number | null = null;
  searchText = '';
  selectedStatus = 'All';
  selectedMethod = 'All';
  selectedModule = 'All';

  selectedLog: ApiLogRecord | null = null;

  statuses = ['All', 'Success', 'Failed', 'Warning'];
  methods = ['All', 'GET', 'POST', 'PUT', 'PATCH', 'DELETE'];
  modules = ['All', 'Authentication', 'Vehicles', 'Booking Requests', 'Reservation Fees', 'Renter Approval'];

  apiLogs: ApiLogRecord[] = [
    {
      id: 1,
      requestId: 'REQ-2026-000001',
      requestDate: 'Jul 25, 2026 09:10 AM',
      endpoint: '/api/lessor/dashboard/summary',
      method: 'GET',
      module: 'Dashboard',
      status: 'Success',
      statusCode: 200,
      durationMs: 142,
      apiCredits: 1,
      clientApp: 'FamBridge Lessor App',
      ipAddress: '103.12.45.90',
      payload: '{ "tenantId": "TENANT-001" }',
      response: '{ "pendingBookings": 23, "pendingRenters": 8, "vehicles": 18 }'
    },
    {
      id: 2,
      requestId: 'REQ-2026-000002',
      requestDate: 'Jul 25, 2026 09:15 AM',
      endpoint: '/api/vehicles',
      method: 'GET',
      module: 'Vehicles',
      status: 'Success',
      statusCode: 200,
      durationMs: 188,
      apiCredits: 1,
      clientApp: 'FamBridge Lessor App',
      ipAddress: '103.12.45.90',
      payload: '{ "page": 1, "limit": 20 }',
      response: '{ "data": [ ... ], "total": 18 }'
    },
    {
      id: 3,
      requestId: 'REQ-2026-000003',
      requestDate: 'Jul 25, 2026 09:20 AM',
      endpoint: '/api/booking-requests/BR-2026-0002',
      method: 'GET',
      module: 'Booking Requests',
      status: 'Success',
      statusCode: 200,
      durationMs: 210,
      apiCredits: 1,
      clientApp: 'FamBridge Lessor App',
      ipAddress: '103.12.45.90',
      payload: '{ "bookingNo": "BR-2026-0002" }',
      response: '{ "bookingStatus": "Pending Lessor Approval" }'
    },
    {
      id: 4,
      requestId: 'REQ-2026-000004',
      requestDate: 'Jul 25, 2026 09:25 AM',
      endpoint: '/api/reservation-fees/confirm',
      method: 'POST',
      module: 'Reservation Fees',
      status: 'Success',
      statusCode: 200,
      durationMs: 275,
      apiCredits: 2,
      clientApp: 'FamBridge Lessor App',
      ipAddress: '103.12.45.90',
      payload: '{ "bookingNo": "BR-2026-0002", "action": "CONFIRM_PAYMENT" }',
      response: '{ "paymentStatus": "Reservation Fee Confirmed" }'
    },
    {
      id: 5,
      requestId: 'REQ-2026-000005',
      requestDate: 'Jul 25, 2026 09:30 AM',
      endpoint: '/api/renter-approval/document/reject',
      method: 'POST',
      module: 'Renter Approval',
      status: 'Failed',
      statusCode: 422,
      durationMs: 320,
      apiCredits: 1,
      clientApp: 'FamBridge Lessor App',
      ipAddress: '103.12.45.90',
      payload: '{ "documentId": 22, "remarks": "Too short" }',
      response: '{ "message": "Remarks must be at least 50 characters." }',
      errorMessage: 'Validation failed. Rejection remarks did not meet minimum character requirement.'
    },
    {
      id: 6,
      requestId: 'REQ-2026-000006',
      requestDate: 'Jul 25, 2026 09:34 AM',
      endpoint: '/api/renter-approval/document/verify',
      method: 'POST',
      module: 'Renter Approval',
      status: 'Success',
      statusCode: 200,
      durationMs: 254,
      apiCredits: 2,
      clientApp: 'FamBridge Lessor App',
      ipAddress: '103.12.45.90',
      payload: '{ "documentId": 21, "status": "Verified" }',
      response: '{ "documentStatus": "Verified", "reviewedBy": "Admin User" }'
    },
    {
      id: 7,
      requestId: 'REQ-2026-000007',
      requestDate: 'Jul 25, 2026 09:40 AM',
      endpoint: '/api/auth/login',
      method: 'POST',
      module: 'Authentication',
      status: 'Warning',
      statusCode: 401,
      durationMs: 198,
      apiCredits: 1,
      clientApp: 'FamBridge Lessor App',
      ipAddress: '180.191.45.22',
      payload: '{ "email": "admin@demo.com", "password": "***MASKED***" }',
      response: '{ "message": "Invalid credentials" }',
      errorMessage: 'Failed login attempt.'
    }
  ];

  get filteredLogs(): ApiLogRecord[] {
    const keyword = this.searchText.toLowerCase().trim();

    return this.apiLogs.filter(item => {
      const matchSearch =
        !keyword ||
        item.requestId.toLowerCase().includes(keyword) ||
        item.endpoint.toLowerCase().includes(keyword) ||
        item.module.toLowerCase().includes(keyword) ||
        item.clientApp.toLowerCase().includes(keyword);

      const matchStatus =
        this.selectedStatus === 'All' ||
        item.status === this.selectedStatus;

      const matchMethod =
        this.selectedMethod === 'All' ||
        item.method === this.selectedMethod;

      const matchModule =
        this.selectedModule === 'All' ||
        item.module === this.selectedModule;

      return matchSearch && matchStatus && matchMethod && matchModule;
    });
  }
  get visibleLogs(): ApiLogRecord[] {
    if (this.selectedLog) {
      return [this.selectedLog];
    }

    return this.filteredLogs;
  }
  get totalRequests(): number {
    return this.apiLogs.length;
  }

  get successfulRequests(): number {
    return this.apiLogs.filter(item => item.status === 'Success').length;
  }

  get failedRequests(): number {
    return this.apiLogs.filter(item => item.status === 'Failed').length;
  }

  get warningRequests(): number {
    return this.apiLogs.filter(item => item.status === 'Warning').length;
  }

  get totalCreditsUsed(): number {
    return this.apiLogs.reduce((sum, item) => sum + item.apiCredits, 0);
  }

  get estimatedCost(): number {
    return this.totalCreditsUsed * 0.75;
  }

  get averageDuration(): number {
    if (this.apiLogs.length === 0) {
      return 0;
    }

    const total = this.apiLogs.reduce((sum, item) => sum + item.durationMs, 0);
    return Math.round(total / this.apiLogs.length);
  }

  get endpointUsage(): EndpointUsage[] {
    const groups = new Map<string, EndpointUsage>();

    this.apiLogs.forEach(log => {
      const key = log.endpoint;

      if (!groups.has(key)) {
        groups.set(key, {
          endpoint: log.endpoint,
          module: log.module,
          totalRequests: 0,
          successCount: 0,
          failedCount: 0,
          avgDurationMs: 0,
          creditsUsed: 0
        });
      }

      const group = groups.get(key);

      if (!group) {
        return;
      }

      group.totalRequests += 1;
      group.creditsUsed += log.apiCredits;

      if (log.status === 'Success') {
        group.successCount += 1;
      }

      if (log.status === 'Failed') {
        group.failedCount += 1;
      }

      const logsForEndpoint = this.apiLogs.filter(item => item.endpoint === key);
      const totalDuration = logsForEndpoint.reduce((sum, item) => sum + item.durationMs, 0);
      group.avgDurationMs = Math.round(totalDuration / logsForEndpoint.length);
    });

    return Array.from(groups.values());
  }

  openLog(record: ApiLogRecord): void {
    this.selectedLog = record;
    this.returningLogId = record.id;

    setTimeout(() => {
      document
        .getElementById('apiLogDetailSection')
        ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  }


  backToLogList(): void {
    const lastViewedId = this.selectedLog?.id;

    this.selectedLog = null;

    setTimeout(() => {
      document
        .getElementById('api-log-card-' + lastViewedId)
        ?.scrollIntoView({ behavior: 'smooth', block: 'center' });

      setTimeout(() => {
        this.returningLogId = null;
      }, 1400);
    }, 100);
  }
  clearFilters(): void {
    this.searchText = '';
    this.selectedStatus = 'All';
    this.selectedMethod = 'All';
    this.selectedModule = 'All';
  }
}
