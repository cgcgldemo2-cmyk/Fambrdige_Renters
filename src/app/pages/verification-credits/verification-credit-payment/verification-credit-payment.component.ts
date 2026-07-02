import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

export interface CreditPackage {
  id: number;
  credits: number;
  price: number;
  description: string;
  popular?: boolean;
}

export interface PaymentSubmission {
  packageId: number;
  credits: number;
  amount: number;
  paymentMethod: string;
  paymentReference: string;
  receiptFileName: string;
}

interface PaymentMethod {
  id: string;
  name: string;
  icon: string;
  accountName: string;
  qrLabel: string;
}

@Component({
  selector: 'app-verification-credit-payment',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './verification-credit-payment.component.html',
  styleUrls: ['./verification-credit-payment.component.scss']
})
export class VerificationCreditPaymentComponent {
  @Input() selectedPackage: CreditPackage | null = null;

  @Output() paymentSubmitted = new EventEmitter<PaymentSubmission>();
  @Output() cancelled = new EventEmitter<void>();

  selectedPaymentMethodId = 'gcash';
  paymentReference = '';
  receiptFile: File | null = null;
  receiptPreviewUrl = '';
  isSubmitted = false;

  paymentMethods: PaymentMethod[] = [
    {
      id: 'gcash',
      name: 'GCash',
      icon: '💙',
      accountName: 'CGIC Verification Services Inc.',
      qrLabel: 'GCash QR'
    },
    {
      id: 'maya',
      name: 'Maya',
      icon: '🟢',
      accountName: 'CGIC Verification Services Inc.',
      qrLabel: 'Maya QR'
    },
    {
      id: 'shopeepay',
      name: 'ShopeePay',
      icon: '🛒',
      accountName: 'CGIC Verification Services Inc.',
      qrLabel: 'ShopeePay QR'
    },
    {
      id: 'bank',
      name: 'Bank QR',
      icon: '🏦',
      accountName: 'CGIC Verification Services Inc.',
      qrLabel: 'Bank QR'
    }
  ];

  get selectedPaymentMethod(): PaymentMethod {
    return (
      this.paymentMethods.find(item => item.id === this.selectedPaymentMethodId) ||
      this.paymentMethods[0]
    );
  }

  selectPaymentMethod(methodId: string): void {
    this.selectedPaymentMethodId = methodId;
  }

  onReceiptSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (!file) {
      return;
    }

    const allowedTypes = ['image/jpeg', 'image/png'];

    if (!allowedTypes.includes(file.type)) {
      alert('Only JPG and PNG files are allowed.');
      input.value = '';
      return;
    }

    const maxSizeInMb = 5;
    const maxSizeInBytes = maxSizeInMb * 1024 * 1024;

    if (file.size > maxSizeInBytes) {
      alert('Maximum file size is 5MB.');
      input.value = '';
      return;
    }

    this.receiptFile = file;
    this.receiptPreviewUrl = URL.createObjectURL(file);
  }

  removeReceipt(): void {
    this.receiptFile = null;
    this.receiptPreviewUrl = '';
  }

  submitPayment(): void {
    if (!this.selectedPackage) {
      return;
    }

    if (!this.paymentReference.trim()) {
      alert('Please enter the payment reference number.');
      return;
    }

    if (!this.receiptFile) {
      alert('Please upload the payment receipt screenshot.');
      return;
    }

    this.isSubmitted = true;

    this.paymentSubmitted.emit({
      packageId: this.selectedPackage.id,
      credits: this.selectedPackage.credits,
      amount: this.selectedPackage.price,
      paymentMethod: this.selectedPaymentMethod.name,
      paymentReference: this.paymentReference.trim(),
      receiptFileName: this.receiptFile.name
    });
  }

  cancel(): void {
    this.cancelled.emit();
  }
}
