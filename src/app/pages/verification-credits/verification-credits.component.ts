import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  CreditPackage,
  PaymentSubmission,
  VerificationCreditPaymentComponent
} from './verification-credit-payment/verification-credit-payment.component';
import { LessorSidebarComponent } from '../../shared/components/lessor-sidebar/lessor-sidebar.component';

interface CreditStat {
  label: string;
  value: string | number;
  subtitle: string;
  icon: string;
  type: 'orange' | 'blue' | 'dark';
}

type CreditTransactionStatus =
  | 'Completed'
  | 'Consumed'
  | 'Pending Review'
  | 'Refunded';

type CreditTransactionStatusFilter = 'All' | CreditTransactionStatus;

type CreditTransactionType =
  | 'Credit Purchase'
  | 'Credit Used'
  | 'Refund Credit Used'
  | 'API Usage Credit Used';

type CreditTransactionTypeFilter = 'All' | CreditTransactionType;

interface CreditTransaction {
  id: number;
  transactionDate: string;
  reference: string;
  type: CreditTransactionType;
  credits: number;
  amount: number;
  status: CreditTransactionStatus;
  description: string;
  paymentMethod?: string;
  paymentSource?: string;
  packageName?: string;
  receiptFileName?: string;
  receiptFileSize?: string;
  verificationRequestNo?: string;
  documentType?: string;
  refundReason?: string;
  originalReference?: string;
  apiEndpoint?: string;
  moduleName?: string;
  creditCost?: number;
  requestCount?: number;
  triggeredBy?: string;
  notes?: string;
}

@Component({
  selector: 'app-verification-credits',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    LessorSidebarComponent,
    VerificationCreditPaymentComponent
  ],
  templateUrl: './verification-credits.component.html',
  styleUrls: ['./verification-credits.component.scss']
})
export class VerificationCreditsComponent {
  showPaymentFlow = false;
  selectedPackageForPayment: CreditPackage | null = null;

  searchReference = '';
  statusFilter: CreditTransactionStatusFilter = 'All';
  typeFilter: CreditTransactionTypeFilter = 'All';
  dateFrom = '';
  dateTo = '';

  statusOptions: CreditTransactionStatusFilter[] = [
    'All',
    'Completed',
    'Consumed',
    'Pending Review',
    'Refunded'
  ];

  typeOptions: CreditTransactionTypeFilter[] = [
    'All',
    'Credit Purchase',
    'Credit Used',
    'Refund Credit Used',
    'API Usage Credit Used'
  ];

  pageSizeOptions: number[] = [10, 20, 30, 50, 75, 100];
  pageSize = 20;
  currentPage = 1;

  expandedTransactionId: number | null = null;

  availableCredits = 118;
  selectedPackageId = 2;

  stats: CreditStat[] = [
    {
      label: 'Available Credits',
      value: 118,
      subtitle: 'Valid until May 31, 2027',
      icon: '💳',
      type: 'orange'
    },
    {
      label: 'Used This Month',
      value: 32,
      subtitle: 'This month',
      icon: '📈',
      type: 'blue'
    },
    {
      label: 'Pending Verifications',
      value: 5,
      subtitle: 'Requires credits',
      icon: '⏱',
      type: 'orange'
    },
    {
      label: 'Total Spent',
      value: '$1,320',
      subtitle: 'All time',
      icon: '$',
      type: 'dark'
    }
  ];

  creditPackages: CreditPackage[] = [
    {
      id: 1,
      credits: 10,
      price: 49,
      description: 'Perfect for occasional verifications'
    },
    {
      id: 2,
      credits: 25,
      price: 109,
      description: 'Great for growing organizations',
      popular: true
    },
    {
      id: 3,
      credits: 50,
      price: 199,
      description: 'Best value for high volume users'
    }
  ];

  transactions: CreditTransaction[] = this.generateSampleTransactions(200);

  get isFocusedOnTransaction(): boolean {
    return this.expandedTransactionId !== null;
  }

  get filteredTransactions(): CreditTransaction[] {
    const searchText = this.searchReference.trim().toLowerCase();

    return this.transactions.filter(transaction => {
      const matchesReference =
        !searchText || transaction.reference.toLowerCase().includes(searchText);

      const matchesStatus =
        this.statusFilter === 'All' || transaction.status === this.statusFilter;

      const matchesType =
        this.typeFilter === 'All' || transaction.type === this.typeFilter;

      const transactionDate = new Date(transaction.transactionDate);
      const fromDate = this.dateFrom ? new Date(this.dateFrom) : null;
      const toDate = this.dateTo ? new Date(this.dateTo) : null;

      if (toDate) {
        toDate.setHours(23, 59, 59, 999);
      }

      const matchesFromDate = !fromDate || transactionDate >= fromDate;
      const matchesToDate = !toDate || transactionDate <= toDate;

      return (
        matchesReference &&
        matchesStatus &&
        matchesType &&
        matchesFromDate &&
        matchesToDate
      );
    });
  }

  get totalTransactions(): number {
    return this.filteredTransactions.length;
  }

  get totalPages(): number {
    return Math.ceil(this.totalTransactions / this.pageSize) || 1;
  }

  get paginatedTransactions(): CreditTransaction[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;

    return this.filteredTransactions.slice(startIndex, endIndex);
  }

  get visibleTransactions(): CreditTransaction[] {
    if (!this.expandedTransactionId) {
      return this.paginatedTransactions;
    }

    const selectedTransaction = this.paginatedTransactions.find(
      transaction => transaction.id === this.expandedTransactionId
    );

    return selectedTransaction ? [selectedTransaction] : this.paginatedTransactions;
  }

  get paginationStart(): number {
    if (this.totalTransactions === 0) {
      return 0;
    }

    return (this.currentPage - 1) * this.pageSize + 1;
  }

  get paginationEnd(): number {
    return Math.min(this.currentPage * this.pageSize, this.totalTransactions);
  }

  selectPackage(packageId: number): void {
    this.selectedPackageId = packageId;
  }

  buyCredits(): void {
    const selectedPackage = this.creditPackages.find(
      item => item.id === this.selectedPackageId
    );

    if (!selectedPackage) {
      return;
    }

    this.selectedPackageForPayment = selectedPackage;
    this.showPaymentFlow = true;

    setTimeout(() => {
      document
        .querySelector('app-verification-credit-payment')
        ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  }

  onPaymentSubmitted(payment: PaymentSubmission): void {
    const today = new Date();
    const newId = Math.max(...this.transactions.map(item => item.id), 0) + 1;

    const transaction: CreditTransaction = {
      id: newId,
      transactionDate: today.toISOString(),
      reference: payment.paymentReference,
      type: 'Credit Purchase',
      credits: payment.credits,
      amount: payment.amount,
      status: 'Pending Review',
      description: `Credit purchase request submitted via ${payment.paymentMethod}.`,
      paymentMethod: payment.paymentMethod,
      paymentSource: `${payment.paymentMethod} payment reference`,
      packageName: `${payment.credits} Credits`,
      receiptFileName: payment.receiptFileName,
      receiptFileSize: 'Uploaded file',
      triggeredBy: 'Aarav A.',
      notes: `Receipt uploaded and waiting for admin review.`
    };

    this.transactions = [transaction, ...this.transactions];
    this.currentPage = 1;
    this.expandedTransactionId = transaction.id;
    this.searchReference = '';
    this.statusFilter = 'All';
    this.typeFilter = 'All';
    this.dateFrom = '';
    this.dateTo = '';
  }

  closePaymentFlow(): void {
    this.showPaymentFlow = false;
    this.selectedPackageForPayment = null;
  }

  toggleTransaction(transactionId: number): void {
    if (this.expandedTransactionId === transactionId) {
      this.expandedTransactionId = null;
      return;
    }

    this.expandedTransactionId = transactionId;
  }

  closeFocusedTransaction(): void {
    this.expandedTransactionId = null;
  }

  isTransactionExpanded(transactionId: number): boolean {
    return this.expandedTransactionId === transactionId;
  }

  changePageSize(event: Event): void {
    const value = Number((event.target as HTMLSelectElement).value);

    if (!this.pageSizeOptions.includes(value)) {
      return;
    }

    this.pageSize = value;
    this.currentPage = 1;
    this.expandedTransactionId = null;
  }

  goToPreviousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.expandedTransactionId = null;
    }
  }

  goToNextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.expandedTransactionId = null;
    }
  }

  applyFilters(): void {
    this.currentPage = 1;
    this.expandedTransactionId = null;
  }

  clearFilters(): void {
    this.searchReference = '';
    this.statusFilter = 'All';
    this.typeFilter = 'All';
    this.dateFrom = '';
    this.dateTo = '';
    this.currentPage = 1;
    this.expandedTransactionId = null;
  }

  getCreditClass(credits: number): string {
    return credits > 0 ? 'credit-positive' : 'credit-negative';
  }

  getFormattedCredits(credits: number): string {
    return credits > 0 ? `+${credits}` : `${credits}`;
  }

  getStatusClass(status: CreditTransactionStatus): string {
    return status.toLowerCase().replace(/\s+/g, '-');
  }

  getTypeClass(type: CreditTransactionType): string {
    return type.toLowerCase().replace(/\s+/g, '-');
  }

  getTypeIcon(type: CreditTransactionType): string {
    const icons: Record<CreditTransactionType, string> = {
      'Credit Purchase': '💵',
      'Credit Used': '🛡',
      'Refund Credit Used': '↩',
      'API Usage Credit Used': '☁'
    };

    return icons[type];
  }

  private generateSampleTransactions(count: number): CreditTransaction[] {
    const transactions: CreditTransaction[] = [
      {
        id: 1,
        transactionDate: '2026-07-02T10:45:00',
        reference: 'API-20260702-0001',
        type: 'API Usage Credit Used',
        credits: -2,
        amount: 0,
        status: 'Consumed',
        description: 'Credits deducted for successful API usage.',
        apiEndpoint: '/api/vehicle/availability',
        moduleName: 'Vehicle Search',
        creditCost: 2,
        requestCount: 1,
        triggeredBy: 'Aarav A.',
        notes: 'Credits deducted when a billable API endpoint request was successfully processed.'
      },
      {
        id: 2,
        transactionDate: '2026-07-01T09:30:00',
        reference: 'TXN-20260701-0451',
        type: 'Credit Purchase',
        credits: 20,
        amount: 120,
        status: 'Completed',
        description: 'Credit package purchase completed.',
        paymentMethod: 'GCash',
        paymentSource: 'GCash Wallet (0917 **** 1234)',
        packageName: '20 Credits',
        receiptFileName: 'GCash-07012026.jpg',
        receiptFileSize: '245 KB',
        triggeredBy: 'Aarav A.',
        notes: 'Purchase of credits via GCash.'
      },
      {
        id: 3,
        transactionDate: '2026-06-30T16:15:00',
        reference: 'TXN-20260630-0333',
        type: 'Refund Credit Used',
        credits: 5,
        amount: 0,
        status: 'Refunded',
        description: 'Credits returned from a cancelled verification request.',
        verificationRequestNo: 'VRF-20260630-0119',
        refundReason: 'Verification request was cancelled before review started.',
        originalReference: 'TXN-20260629-0270',
        triggeredBy: 'System',
        notes: 'Credits were returned to the lessor balance.'
      }
    ];

    const purchasePackages = [
      { credits: 10, amount: 49 },
      { credits: 25, amount: 109 },
      { credits: 50, amount: 199 },
      { credits: 100, amount: 379 }
    ];

    const apiEndpoints = [
      {
        endpoint: '/api/vehicle/availability',
        module: 'Vehicle Search',
        creditCost: 2
      },
      {
        endpoint: '/api/renter/profile-check',
        module: 'Renter Screening',
        creditCost: 3
      },
      {
        endpoint: '/api/documents/verification-status',
        module: 'Document Verification',
        creditCost: 1
      }
    ];

    const verificationTypes = [
      'Government ID Verification',
      'Driver License Verification',
      'Proof of Billing Verification',
      'Business Permit Verification'
    ];

    for (let index = 4; index <= count; index++) {
      const date = new Date(2026, 6, 2, 10, 45, 0);
      date.setDate(date.getDate() - index + 1);

      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const referenceNo = String(index).padStart(4, '0');
      const referenceDate = `${year}${month}${day}`;

      if (index % 11 === 0) {
        const api = apiEndpoints[index % apiEndpoints.length];

        transactions.push({
          id: index,
          transactionDate: date.toISOString(),
          reference: `API-${referenceDate}-${referenceNo}`,
          type: 'API Usage Credit Used',
          credits: api.creditCost * -1,
          amount: 0,
          status: 'Consumed',
          description: 'Credits deducted for successful API usage.',
          apiEndpoint: api.endpoint,
          moduleName: api.module,
          creditCost: api.creditCost,
          requestCount: 1,
          triggeredBy: index % 2 === 0 ? 'Aarav A.' : 'System',
          notes: 'Credits deducted when a billable API endpoint request was successfully processed.'
        });

        continue;
      }

      if (index % 9 === 0) {
        transactions.push({
          id: index,
          transactionDate: date.toISOString(),
          reference: `RFD-${referenceDate}-${referenceNo}`,
          type: 'Refund Credit Used',
          credits: [1, 2, 3, 5][index % 4],
          amount: 0,
          status: 'Refunded',
          description: 'Credits returned due to rejected or cancelled verification.',
          verificationRequestNo: `VRF-${referenceDate}-${referenceNo}`,
          refundReason:
            index % 2 === 0
              ? 'Verification request was rejected before credit consumption was finalized.'
              : 'Verification request was cancelled by the lessor.',
          originalReference: `TXN-${referenceDate}-${String(index - 1).padStart(4, '0')}`,
          triggeredBy: 'System',
          notes: 'Credit was returned to the lessor balance.'
        });

        continue;
      }

      if (index % 4 === 0) {
        const packageItem = purchasePackages[index % purchasePackages.length];

        transactions.push({
          id: index,
          transactionDate: date.toISOString(),
          reference: `TXN-${referenceDate}-${referenceNo}`,
          type: 'Credit Purchase',
          credits: packageItem.credits,
          amount: packageItem.amount,
          status: index % 17 === 0 ? 'Pending Review' : 'Completed',
          description: 'Credit package purchase.',
          paymentMethod: index % 3 === 0 ? 'Maya' : 'GCash',
          paymentSource:
            index % 3 === 0
              ? 'Maya Wallet (0998 **** 4421)'
              : 'GCash Wallet (0917 **** 1234)',
          packageName: `${packageItem.credits} Credits`,
          receiptFileName: `Receipt-${referenceDate}.jpg`,
          receiptFileSize: '245 KB',
          triggeredBy: 'Aarav A.',
          notes: 'Purchase of verification credits.'
        });

        continue;
      }

      const creditCost = [1, 2, 3, 5, 7, 10][index % 6];
      const documentType = verificationTypes[index % verificationTypes.length];

      transactions.push({
        id: index,
        transactionDate: date.toISOString(),
        reference: `TXN-${referenceDate}-${referenceNo}`,
        type: 'Credit Used',
        credits: creditCost * -1,
        amount: 0,
        status: 'Consumed',
        description: 'Credits used for document verification.',
        verificationRequestNo: `VRF-${referenceDate}-${referenceNo}`,
        documentType,
        moduleName: 'Document Verification',
        creditCost,
        requestCount: 1,
        triggeredBy: 'Aarav A.',
        notes: `${creditCost} credit${creditCost > 1 ? 's' : ''} consumed for ${documentType}.`
      });
    }

    return transactions;
  }
}
