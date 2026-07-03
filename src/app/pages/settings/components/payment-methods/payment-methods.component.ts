import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

interface PaymentMethodSetting {
  id: string;
  name: string;
  icon: string;
  enabled: boolean;
  qrPreviewUrl: string;
  qrFileName: string;
}

@Component({
  selector: 'app-payment-methods',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './payment-methods.component.html',
  styleUrls: ['./payment-methods.component.scss']
})
export class PaymentMethodsComponent {
  paymentMethods: PaymentMethodSetting[] = [
    { id: 'gcash', name: 'GCash', icon: '🔵', enabled: true, qrPreviewUrl: '', qrFileName: '' },
    { id: 'maya', name: 'Maya', icon: '🟢', enabled: true, qrPreviewUrl: '', qrFileName: '' },
    { id: 'shopeepay', name: 'ShopeePay', icon: '🟧', enabled: true, qrPreviewUrl: '', qrFileName: '' },
    { id: 'bank-transfer', name: 'Bank Transfer', icon: '🏦', enabled: true, qrPreviewUrl: '', qrFileName: '' }
  ];

  toggleMethod(method: PaymentMethodSetting): void {
    method.enabled = !method.enabled;
  }

  onQrSelected(event: Event, method: PaymentMethodSetting): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (!file) {
      return;
    }

    if (!['image/png', 'image/jpeg', 'image/webp'].includes(file.type)) {
      alert('Please upload a clear QR image in PNG, JPG, or WEBP format.');
      input.value = '';
      return;
    }

    method.qrPreviewUrl = URL.createObjectURL(file);
    method.qrFileName = file.name;
  }
}
