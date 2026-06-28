import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LessorSidebarComponent } from '../../shared/components/lessor-sidebar/lessor-sidebar.component';
import { Router } from '@angular/router';

type BookingStatus =
  | 'Pending Lessor Approval'
  | 'Approved'
  | 'Rejected'
  | 'Cancelled';

type ReservationStatus =
  | 'Paid'
  | 'Unpaid'
  | 'Failed';

interface BookingRequest {
  id: number;
  requestNo: string;
  renterName: string;
  renterTrustId: string;
  trustScore: number;
  verifiedDocuments: number;
  successfulRentals: number;
  vehicleName: string;
  carType: string;
  pickupLocation: string;
  pickupDate: string;
  returnDate: string;
  rentalType: string;
  reservationFee: number;
  reservationStatus: ReservationStatus;
  bookingStatus: BookingStatus;
  notes: string;
}

@Component({
  selector: 'app-booking-requests',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    LessorSidebarComponent
  ],
  templateUrl: './booking-requests.component.html',
  styleUrls: ['./booking-requests.component.scss']
})
export class BookingRequestsComponent {
  searchText = '';
  selectedStatus = 'All';
  selectedReservationStatus = 'All';

  selectedRequest: BookingRequest | null = null;

  bookingStatuses = [
    'All',
    'Pending Lessor Approval',
    'Approved',
    'Rejected',
    'Cancelled'
  ];

  reservationStatuses = [
    'All',
    'Paid',
    'Unpaid',
    'Failed'
  ];

  bookingRequests: BookingRequest[] = [
    {
      id: 1,
      requestNo: 'BR-2026-0001',
      renterName: 'Juan Dela Cruz',
      renterTrustId: 'TR-A92X7KQ4',
      trustScore: 82,
      verifiedDocuments: 5,
      successfulRentals: 12,
      vehicleName: 'Ford Everest Titanium',
      carType: 'SUV',
      pickupLocation: 'Puerto Princesa Airport',
      pickupDate: 'Jul 18, 2026 09:00 AM',
      returnDate: 'Jul 20, 2026 09:00 AM',
      rentalType: 'With Driver',
      reservationFee: 1500,
      reservationStatus: 'Paid',
      bookingStatus: 'Pending Lessor Approval',
      notes: 'Renter requested airport pickup and hotel drop-off.'
    },
    {
      id: 2,
      requestNo: 'BR-2026-0002',
      renterName: 'Maria Santos',
      renterTrustId: 'TR-K81P2LM9',
      trustScore: 76,
      verifiedDocuments: 4,
      successfulRentals: 7,
      vehicleName: 'Toyota Vios',
      carType: 'Sedan',
      pickupLocation: 'SM Puerto Princesa',
      pickupDate: 'Jul 21, 2026 10:00 AM',
      returnDate: 'Jul 21, 2026 08:00 PM',
      rentalType: 'Without Driver',
      reservationFee: 900,
      reservationStatus: 'Paid',
      bookingStatus: 'Pending Lessor Approval',
      notes: 'Short rental request for city use.'
    },
    {
      id: 3,
      requestNo: 'BR-2026-0003',
      renterName: 'Mark Reyes',
      renterTrustId: 'TR-M22RTY8',
      trustScore: 61,
      verifiedDocuments: 2,
      successfulRentals: 1,
      vehicleName: 'Toyota Hiace Grandia',
      carType: 'Van',
      pickupLocation: 'El Nido Terminal',
      pickupDate: 'Jul 22, 2026 07:00 AM',
      returnDate: 'Jul 25, 2026 06:00 PM',
      rentalType: 'With Driver',
      reservationFee: 2000,
      reservationStatus: 'Unpaid',
      bookingStatus: 'Pending Lessor Approval',
      notes: 'Group travel request. Documents still incomplete.'
    }
  ];

  get filteredRequests(): BookingRequest[] {
    const keyword = this.searchText.toLowerCase().trim();

    return this.bookingRequests.filter(item => {
      const matchSearch =
        !keyword ||
        item.requestNo.toLowerCase().includes(keyword) ||
        item.renterName.toLowerCase().includes(keyword) ||
        item.vehicleName.toLowerCase().includes(keyword) ||
        item.pickupLocation.toLowerCase().includes(keyword);

      const matchStatus =
        this.selectedStatus === 'All' ||
        item.bookingStatus === this.selectedStatus;

      const matchReservation =
        this.selectedReservationStatus === 'All' ||
        item.reservationStatus === this.selectedReservationStatus;

      return matchSearch && matchStatus && matchReservation;
    });
  }

  get pendingCount(): number {
    return this.bookingRequests.filter(
      item => item.bookingStatus === 'Pending Lessor Approval'
    ).length;
  }

  get paidReservationCount(): number {
    return this.bookingRequests.filter(
      item => item.reservationStatus === 'Paid'
    ).length;
  }

  get approvedCount(): number {
    return this.bookingRequests.filter(
      item => item.bookingStatus === 'Approved'
    ).length;
  }

  get lowTrustCount(): number {
    return this.bookingRequests.filter(
      item => item.trustScore < 70
    ).length;
  }

  constructor(private router: Router) {}
  viewReservationFee(item: BookingRequest): void {
    this.router.navigate(['/reservation-fees'], {
      queryParams: {
        refno: item.requestNo
      }
    });
  }
  openRequest(item: BookingRequest): void {
    this.selectedRequest = item;
  }

  closeRequest(): void {
    this.selectedRequest = null;
  }

  approveRequest(item: BookingRequest): void {
    item.bookingStatus = 'Approved';
    this.selectedRequest = item;
  }

  rejectRequest(item: BookingRequest): void {
    item.bookingStatus = 'Rejected';
    this.selectedRequest = item;
  }
}
