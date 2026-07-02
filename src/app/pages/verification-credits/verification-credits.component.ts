import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  CreditPackage,
  PaymentSubmission,
  VerificationCreditPaymentComponent
} from './verification-credit-payment/verification-credit-payment.component';

interface CreditStat {
  label: string;
  value: string | number;
  subtitle: string;
  icon: string;
  type: 'orange' | 'blue' | 'dark';
}

// interface CreditPackage {
//   id: number;
//   credits: number;
//   price: number;
//   description: string;
//   popular?: boolean;
// }

interface CreditTransaction {
  id: number;
  date: string;
  reference: string;
  credits: number;
  amount: number;
  status: 'Completed' | 'Consumed' | 'Pending Review';
  description: string;
}

@Component({
  selector: 'app-verification-credits',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    VerificationCreditPaymentComponent
  ],
  templateUrl: './verification-credits.component.html',
  styleUrls: ['./verification-credits.component.scss']
})
export class VerificationCreditsComponent {
  showPaymentFlow = false;
  selectedPackageForPayment: CreditPackage | null = null;
  searchReference = '';
  statusFilter: 'All' | CreditTransaction['status'] = 'All';
  dateFrom = '';
  dateTo = '';

  statusOptions: Array<'All' | CreditTransaction['status']> = [
    'All',
    'Completed',
    'Consumed',
    'Pending Review'
  ];
  pageSizeOptions: number[] = [10, 20, 30, 50, 75, 100];
  pageSize = 20;
  currentPage = 1;
  availableCredits = 120;
  selectedPackageId = 2;

  stats: CreditStat[] = [
    {
      label: 'Available Credits',
      value: 120,
      subtitle: 'Valid until May 31, 2026',
      icon: '💳',
      type: 'orange'
    },
    {
      label: 'Used This Month',
      value: 28,
      subtitle: 'This month',
      icon: '📈',
      type: 'blue'
    },
    {
      label: 'Pending Verifications',
      value: 7,
      subtitle: 'Requires credits',
      icon: '⏱',
      type: 'orange'
    },
    {
      label: 'Total Spent',
      value: '$1,240',
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

  expandedTransactionIds: number[] = [];
  private generateSampleTransactions(count: number): CreditTransaction[] {
    const transactions: CreditTransaction[] = [];

    const purchasePackages = [
      {
        credits: 10,
        amount: 49,
        description: 'Credit package purchase'
      },
      {
        credits: 25,
        amount: 109,
        description: 'Credit package purchase'
      },
      {
        credits: 50,
        amount: 199,
        description: 'Credit package purchase'
      },
      {
        credits: 100,
        amount: 379,
        description: 'Credit package purchase'
      }
    ];

    const consumedCredits = [-1, -2, -3, -5, -7, -10];

    for (let index = 1; index <= count; index++) {
      const date = new Date(2026, 4, 12);
      date.setDate(date.getDate() - index + 1);

      const isPurchase = index % 4 === 1 || index % 9 === 0;
      const isPending = index % 17 === 0;

      const month = date.toLocaleString('en-US', { month: 'short' });
      const day = String(date.getDate()).padStart(2, '0');
      const year = date.getFullYear();

      const referenceDate = `${year}${String(date.getMonth() + 1).padStart(2, '0')}${day}`;
      const referenceNo = String(index).padStart(3, '0');

      if (isPurchase) {
        const packageItem = purchasePackages[index % purchasePackages.length];

        transactions.push({
          id: index,
          date: `${month} ${day}, ${year}`,
          reference: `TXN-${referenceDate}-${referenceNo}`,
          credits: packageItem.credits,
          amount: packageItem.amount,
          status: 'Pending Review',
          description: packageItem.description
        });

        continue;
      }

      const consumedCredit = consumedCredits[index % consumedCredits.length];

      transactions.push({
        id: index,
        date: `${month} ${day}, ${year}`,
        reference: `TXN-${referenceDate}-${referenceNo}`,
        credits: consumedCredit,
        amount: 0,
        status: 'Consumed',
        description: 'Credits used for document verification'
      });
    }

    return transactions;
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
  }

  toggleTransaction(transactionId: number): void {
    if (this.expandedTransactionIds.includes(transactionId)) {
      this.expandedTransactionIds = this.expandedTransactionIds.filter(
        id => id !== transactionId
      );
      return;
    }

    this.expandedTransactionIds.push(transactionId);
  }

  isTransactionExpanded(transactionId: number): boolean {
    return this.expandedTransactionIds.includes(transactionId);
  }

  getCreditClass(credits: number): string {
    return credits > 0 ? 'credit-positive' : 'credit-negative';
  }

  getFormattedCredits(credits: number): string {
    return credits > 0 ? `+${credits}` : `${credits}`;
  }

  getStatusClass(status: CreditTransaction['status']): string {
    return status.toLowerCase().replace(/\s+/g, '-');
  }

  get filteredTransactions(): CreditTransaction[] {
    return this.transactions.filter(transaction => {
      const matchesReference =
        !this.searchReference ||
        transaction.reference
          .toLowerCase()
          .includes(this.searchReference.toLowerCase().trim());

      const matchesStatus =
        this.statusFilter === 'All' ||
        transaction.status === this.statusFilter;

      const transactionDate = new Date(transaction.date);
      const fromDate = this.dateFrom ? new Date(this.dateFrom) : null;
      const toDate = this.dateTo ? new Date(this.dateTo) : null;

      const matchesFromDate =
        !fromDate || transactionDate >= fromDate;

      const matchesToDate =
        !toDate || transactionDate <= toDate;

      return (
        matchesReference &&
        matchesStatus &&
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

  get paginationStart(): number {
    if (this.totalTransactions === 0) {
      return 0;
    }

    return (this.currentPage - 1) * this.pageSize + 1;
  }

  get paginationEnd(): number {
    return Math.min(this.currentPage * this.pageSize, this.totalTransactions);
  }

  changePageSize(event: Event): void {
    const value = Number((event.target as HTMLSelectElement).value);

    this.pageSize = value;
    this.currentPage = 1;
  }

  goToPreviousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  goToNextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }
  applyFilters(): void {
    this.currentPage = 1;
  }

  clearFilters(): void {
    this.searchReference = '';
    this.statusFilter = 'All';
    this.dateFrom = '';
    this.dateTo = '';
    this.currentPage = 1;
  }

  onPaymentSubmitted(payment: PaymentSubmission): void {
    const today = new Date();

    const transaction: CreditTransaction = {
      id: this.transactions.length + 1,
      date: today.toLocaleDateString('en-US', {
        month: 'short',
        day: '2-digit',
        year: 'numeric'
      }),
      reference: payment.paymentReference,
      credits: payment.credits,
      amount: payment.amount,
      status: 'Pending Review',
      description: `Credit purchase request submitted via ${payment.paymentMethod}`
    };

    this.transactions = [
      transaction,
      ...this.transactions
    ];

    this.currentPage = 1;
  }
  closePaymentFlow(): void {
    this.showPaymentFlow = false;
    this.selectedPackageForPayment = null;
  }
}
