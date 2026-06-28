import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LessorSidebarComponent } from '../../shared/components/lessor-sidebar/lessor-sidebar.component';

type PaymentStatus =
  | 'Pending Payment'
  | 'Pending Payment Confirmation'
  | 'Reservation Fee Confirmed'
  | 'Payment Rejected'
  | 'Payment Failed';

type BookingStatus =
  | 'Pending Lessor Approval'
  | 'Approved'
  | 'Rejected'
  | 'Cancelled';

type PaymentNoteSource = 'Renter' | 'System' | 'Lessor';

interface PaymentAttempt {
  id: number;
  referenceNo: string;
  status: PaymentStatus;
  submittedDate: string;
  paymentMethod: string;
  lessorPaymentAccount: string;
  paymentProofUrl?: string;
  notes?: string;
}

interface PaymentNote {
  source: PaymentNoteSource;
  createdBy: string;
  createdAt: string;
  message: string;
}

interface ReservationFeeRecord {
  id: number;
  bookingNo: string;
  renterName: string;
  vehicleName: string;
  rentalTotal: number;
  reservationFee: number;
  remainingBalance: number;
  paymentMethod: string;
  lessorPaymentAccount: string;
  paymentReference: string;
  paymentProofUrl?: string;
  paymentStatus: PaymentStatus;
  bookingStatus: BookingStatus;
  submittedDate: string;
  confirmedDate?: string;
  confirmedBy?: string;
  cancelledDate?: string;
  cancelledBy?: string;
  selectedPaymentAttemptId?: number;
  paymentAttempts: PaymentAttempt[];
  notes: PaymentNote[];
}

@Component({
  selector: 'app-reservation-fees',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    LessorSidebarComponent
  ],
  templateUrl: './reservation-fees.component.html',
  styleUrls: ['./reservation-fees.component.scss']
})
export class ReservationFeesComponent {
  searchText = '';
  selectedStatus = 'All';

  selectedRecord: ReservationFeeRecord | null = null;

  showRejectPaymentBox = false;
  showCancelBookingBox = false;

  rejectPaymentReason = '';
  cancelBookingReason = '';

  paymentStatuses = [
    'All',
    'Pending Payment',
    'Pending Payment Confirmation',
    'Reservation Fee Confirmed',
    'Payment Rejected',
    'Payment Failed'
  ];

  records: ReservationFeeRecord[] = [
    {
      id: 1,
      bookingNo: 'BR-2026-0001',
      renterName: 'Juan Dela Cruz',
      vehicleName: 'Ford Everest Titanium',
      rentalTotal: 9000,
      reservationFee: 1500,
      remainingBalance: 7500,
      paymentMethod: 'GCash QR',
      lessorPaymentAccount: 'Juan Dela Cruz Car Rental - GCash',
      paymentReference: 'GCASH-982381-B',
      paymentProofUrl: '',
      paymentStatus: 'Pending Payment Confirmation',
      bookingStatus: 'Pending Lessor Approval',
      submittedDate: 'Jul 18, 2026 09:10 AM',
      selectedPaymentAttemptId: 2,
      paymentAttempts: [
        {
          id: 1,
          referenceNo: 'GCASH-982381-A',
          status: 'Payment Rejected',
          submittedDate: 'Jul 18, 2026 08:42 AM',
          paymentMethod: 'GCash QR',
          lessorPaymentAccount: 'Juan Dela Cruz Car Rental - GCash',
          paymentProofUrl: '',
          notes: 'First submitted reference was not found in the lessor GCash account.'
        },
        {
          id: 2,
          referenceNo: 'GCASH-982381-B',
          status: 'Pending Payment Confirmation',
          submittedDate: 'Jul 18, 2026 09:10 AM',
          paymentMethod: 'GCash QR',
          lessorPaymentAccount: 'Juan Dela Cruz Car Rental - GCash',
          paymentProofUrl: '',
          notes: 'Renter re-uploaded payment proof with a new reference number.'
        }
      ],
      notes: [
        {
          source: 'Renter',
          createdBy: 'Juan Dela Cruz',
          createdAt: 'Jul 18, 2026 08:42 AM',
          message: 'I already scanned the GCash QR and paid the reservation fee.'
        },
        {
          source: 'System',
          createdBy: 'FamBridge API',
          createdAt: 'Jul 18, 2026 08:43 AM',
          message: 'Payment reference was submitted together with the booking request.'
        },
        {
          source: 'Lessor',
          createdBy: 'Admin User',
          createdAt: 'Jul 18, 2026 08:55 AM',
          message: 'Payment rejected: First submitted reference number was not found in the lessor payment account.'
        },
        {
          source: 'Renter',
          createdBy: 'Juan Dela Cruz',
          createdAt: 'Jul 18, 2026 09:10 AM',
          message: 'I uploaded a new payment reference and proof.'
        },
        {
          source: 'System',
          createdBy: 'FamBridge API',
          createdAt: 'Jul 18, 2026 09:11 AM',
          message: 'A new payment attempt was submitted and is waiting for lessor confirmation.'
        }
      ]
    },
    {
      id: 2,
      bookingNo: 'BR-2026-0002',
      renterName: 'Maria Santos',
      vehicleName: 'Toyota Vios',
      rentalTotal: 2300,
      reservationFee: 900,
      remainingBalance: 1400,
      paymentMethod: 'Maya QR',
      lessorPaymentAccount: 'JD Car Rental - Maya',
      paymentReference: 'MAYA-774912',
      paymentProofUrl: '',
      paymentStatus: 'Reservation Fee Confirmed',
      bookingStatus: 'Pending Lessor Approval',
      submittedDate: 'Jul 21, 2026 09:15 AM',
      confirmedDate: 'Jul 21, 2026 09:25 AM',
      confirmedBy: 'Admin User',
      selectedPaymentAttemptId: 1,
      paymentAttempts: [
        {
          id: 1,
          referenceNo: 'MAYA-774912',
          status: 'Reservation Fee Confirmed',
          submittedDate: 'Jul 21, 2026 09:15 AM',
          paymentMethod: 'Maya QR',
          lessorPaymentAccount: 'JD Car Rental - Maya',
          paymentProofUrl: '',
          notes: 'Payment was confirmed by the lessor.'
        }
      ],
      notes: [
        {
          source: 'Renter',
          createdBy: 'Maria Santos',
          createdAt: 'Jul 21, 2026 09:15 AM',
          message: 'Reservation fee sent through Maya QR.'
        },
        {
          source: 'Lessor',
          createdBy: 'Admin User',
          createdAt: 'Jul 21, 2026 09:25 AM',
          message: 'Payment verified from Maya account. Reference number matched.'
        }
      ]
    },
    {
      id: 3,
      bookingNo: 'BR-2026-0003',
      renterName: 'Mark Reyes',
      vehicleName: 'Toyota Hiace Grandia',
      rentalTotal: 18600,
      reservationFee: 2000,
      remainingBalance: 16600,
      paymentMethod: 'QRPH',
      lessorPaymentAccount: 'JD Car Rental - QRPH',
      paymentReference: '',
      paymentProofUrl: '',
      paymentStatus: 'Pending Payment',
      bookingStatus: 'Pending Lessor Approval',
      submittedDate: 'Jul 22, 2026 07:05 AM',
      selectedPaymentAttemptId: 1,
      paymentAttempts: [
        {
          id: 1,
          referenceNo: '',
          status: 'Pending Payment',
          submittedDate: 'Jul 22, 2026 07:05 AM',
          paymentMethod: 'QRPH',
          lessorPaymentAccount: 'JD Car Rental - QRPH',
          paymentProofUrl: '',
          notes: 'Booking request was created, but renter has not submitted payment reference or proof yet.'
        }
      ],
      notes: [
        {
          source: 'System',
          createdBy: 'FamBridge API',
          createdAt: 'Jul 22, 2026 07:05 AM',
          message: 'Booking request was created but renter has not submitted payment proof yet.'
        }
      ]
    },
    {
      id: 4,
      bookingNo: 'BR-2026-0004',
      renterName: 'Ana Lim',
      vehicleName: 'Mitsubishi Xpander',
      rentalTotal: 4200,
      reservationFee: 1000,
      remainingBalance: 3200,
      paymentMethod: 'GCash QR',
      lessorPaymentAccount: 'Juan Dela Cruz Car Rental - GCash',
      paymentReference: 'GCASH-662901',
      paymentProofUrl: '',
      paymentStatus: 'Payment Rejected',
      bookingStatus: 'Pending Lessor Approval',
      submittedDate: 'Jul 23, 2026 02:20 PM',
      confirmedDate: 'Jul 23, 2026 02:40 PM',
      confirmedBy: 'Admin User',
      selectedPaymentAttemptId: 1,
      paymentAttempts: [
        {
          id: 1,
          referenceNo: 'GCASH-662901',
          status: 'Payment Rejected',
          submittedDate: 'Jul 23, 2026 02:20 PM',
          paymentMethod: 'GCash QR',
          lessorPaymentAccount: 'Juan Dela Cruz Car Rental - GCash',
          paymentProofUrl: '',
          notes: 'Reference number was not found in the lessor GCash account.'
        }
      ],
      notes: [
        {
          source: 'Renter',
          createdBy: 'Ana Lim',
          createdAt: 'Jul 23, 2026 02:20 PM',
          message: 'I submitted the GCash reference number after payment.'
        },
        {
          source: 'Lessor',
          createdBy: 'Admin User',
          createdAt: 'Jul 23, 2026 02:40 PM',
          message: 'Payment rejected: Reference number was not found in the lessor payment account.'
        },
        {
          source: 'System',
          createdBy: 'FamBridge API',
          createdAt: 'Jul 23, 2026 02:41 PM',
          message: 'Payment was rejected. Booking request remains active unless the lessor cancels the booking separately.'
        }
      ]
    }
  ];

  get filteredRecords(): ReservationFeeRecord[] {
    const keyword = this.searchText.toLowerCase().trim();

    return this.records.filter(record => {
      const attemptMatch = record.paymentAttempts.some(attempt =>
        attempt.referenceNo.toLowerCase().includes(keyword) ||
        attempt.paymentMethod.toLowerCase().includes(keyword) ||
        attempt.lessorPaymentAccount.toLowerCase().includes(keyword)
      );

      const matchSearch =
        !keyword ||
        record.bookingNo.toLowerCase().includes(keyword) ||
        record.renterName.toLowerCase().includes(keyword) ||
        record.vehicleName.toLowerCase().includes(keyword) ||
        record.paymentReference.toLowerCase().includes(keyword) ||
        record.lessorPaymentAccount.toLowerCase().includes(keyword) ||
        attemptMatch;

      const matchStatus =
        this.selectedStatus === 'All' ||
        record.paymentStatus === this.selectedStatus;

      return matchSearch && matchStatus;
    });
  }

  get visibleRecords(): ReservationFeeRecord[] {
    if (this.selectedRecord) {
      return [this.selectedRecord];
    }

    return this.filteredRecords;
  }

  get pendingConfirmationCount(): number {
    return this.records.filter(
      record => record.paymentStatus === 'Pending Payment Confirmation'
    ).length;
  }

  get confirmedCount(): number {
    return this.records.filter(
      record => record.paymentStatus === 'Reservation Fee Confirmed'
    ).length;
  }

  get rejectedCount(): number {
    return this.records.filter(
      record => record.paymentStatus === 'Payment Rejected'
    ).length;
  }

  get confirmedReservationFees(): number {
    return this.records
      .filter(record => record.paymentStatus === 'Reservation Fee Confirmed')
      .reduce((total, record) => total + record.reservationFee, 0);
  }

  openRecord(record: ReservationFeeRecord): void {
    const latestAttempt = this.getLatestAttempt(record);
    record.selectedPaymentAttemptId = record.selectedPaymentAttemptId || latestAttempt?.id;

    this.selectedRecord = record;
    this.resetActionBoxes();

    setTimeout(() => {
      document
        .getElementById('paymentDetailSection')
        ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  }

  backToList(): void {
    this.selectedRecord = null;
    this.resetActionBoxes();

    setTimeout(() => {
      document
        .getElementById('reservationRecordsList')
        ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  }

  confirmPayment(record: ReservationFeeRecord): void {
    if (record.bookingStatus === 'Cancelled') {
      return;
    }

    const activeAttempt = this.getLatestAttempt(record);

    record.paymentStatus = 'Reservation Fee Confirmed';
    record.confirmedDate = 'Today';
    record.confirmedBy = 'Current User';

    if (activeAttempt) {
      activeAttempt.status = 'Reservation Fee Confirmed';
      activeAttempt.notes = 'Payment has been confirmed by the lessor.';
      record.selectedPaymentAttemptId = activeAttempt.id;
      record.paymentReference = activeAttempt.referenceNo;
      record.paymentMethod = activeAttempt.paymentMethod;
      record.lessorPaymentAccount = activeAttempt.lessorPaymentAccount;
      record.paymentProofUrl = activeAttempt.paymentProofUrl || '';
      record.submittedDate = activeAttempt.submittedDate;
    }

    record.notes = [
      ...record.notes,
      {
        source: 'Lessor',
        createdBy: 'Current User',
        createdAt: 'Today',
        message: 'Payment has been confirmed by the lessor.'
      }
    ];

    this.selectedRecord = record;
    this.resetActionBoxes();
  }

  startRejectPayment(record: ReservationFeeRecord): void {
    this.selectedRecord = record;
    this.showRejectPaymentBox = true;
    this.showCancelBookingBox = false;
    this.rejectPaymentReason = '';

    setTimeout(() => {
      document
        .getElementById('rejectPaymentBox')
        ?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
  }

  proceedRejectPayment(): void {
    if (!this.selectedRecord || !this.rejectPaymentReason.trim()) {
      return;
    }

    const activeAttempt = this.getLatestAttempt(this.selectedRecord);
    const reason = this.rejectPaymentReason.trim();

    this.selectedRecord.paymentStatus = 'Payment Rejected';
    this.selectedRecord.confirmedDate = 'Today';
    this.selectedRecord.confirmedBy = 'Current User';

    if (activeAttempt) {
      activeAttempt.status = 'Payment Rejected';
      activeAttempt.notes = reason;
      this.selectedRecord.selectedPaymentAttemptId = activeAttempt.id;
      this.selectedRecord.paymentReference = activeAttempt.referenceNo;
      this.selectedRecord.paymentMethod = activeAttempt.paymentMethod;
      this.selectedRecord.lessorPaymentAccount = activeAttempt.lessorPaymentAccount;
      this.selectedRecord.paymentProofUrl = activeAttempt.paymentProofUrl || '';
      this.selectedRecord.submittedDate = activeAttempt.submittedDate;
    }

    this.selectedRecord.notes = [
      ...this.selectedRecord.notes,
      {
        source: 'Lessor',
        createdBy: 'Current User',
        createdAt: 'Today',
        message: `Payment rejected: ${reason}`
      },
      {
        source: 'System',
        createdBy: 'FamBridge API',
        createdAt: 'Today',
        message: 'Payment was rejected. Booking request remains active unless the lessor cancels the booking separately.'
      }
    ];

    this.rejectPaymentReason = '';
    this.showRejectPaymentBox = false;
  }

  startCancelBooking(record: ReservationFeeRecord): void {
    this.selectedRecord = record;
    this.showCancelBookingBox = true;
    this.showRejectPaymentBox = false;
    this.cancelBookingReason = '';

    setTimeout(() => {
      document
        .getElementById('cancelBookingBox')
        ?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
  }

  proceedCancelBooking(): void {
    if (!this.selectedRecord || !this.cancelBookingReason.trim()) {
      return;
    }

    const record = this.records.find(item => item.id === this.selectedRecord?.id);
    const reason = this.cancelBookingReason.trim();

    if (!record) {
      return;
    }

    record.bookingStatus = 'Cancelled';
    record.cancelledDate = 'Today';
    record.cancelledBy = 'Current User';

    record.notes = [
      ...record.notes,
      {
        source: 'Lessor',
        createdBy: 'Current User',
        createdAt: 'Today',
        message: `Booking cancelled: ${reason}`
      },
      {
        source: 'System',
        createdBy: 'FamBridge API',
        createdAt: 'Today',
        message: 'Booking request has been cancelled by the lessor.'
      }
    ];

    this.selectedRecord = record;
    this.cancelBookingReason = '';
    this.showCancelBookingBox = false;
  }

  cancelAction(): void {
    this.resetActionBoxes();
  }

  selectPaymentAttempt(record: ReservationFeeRecord, attempt: PaymentAttempt): void {
    record.selectedPaymentAttemptId = attempt.id;
    this.selectedRecord = record;
  }

  getSelectedAttempt(record: ReservationFeeRecord): PaymentAttempt | null {
    if (!record.paymentAttempts || record.paymentAttempts.length === 0) {
      return null;
    }

    return (
      record.paymentAttempts.find(
        attempt => attempt.id === record.selectedPaymentAttemptId
      ) || this.getLatestAttempt(record)
    );
  }

  getLatestAttempt(record: ReservationFeeRecord): PaymentAttempt | null {
    if (!record.paymentAttempts || record.paymentAttempts.length === 0) {
      return null;
    }

    return record.paymentAttempts[record.paymentAttempts.length - 1];
  }

  private resetActionBoxes(): void {
    this.showRejectPaymentBox = false;
    this.showCancelBookingBox = false;
    this.rejectPaymentReason = '';
    this.cancelBookingReason = '';
  }
}
