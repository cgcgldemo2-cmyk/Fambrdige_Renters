import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { StripeService } from '../../../../services/stripe.service';

@Component({
  selector: 'app-api-key-generation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './api-key-generation.component.html',
  styleUrls: ['./api-key-generation.component.scss']
})
export class ApiKeyGenerationComponent implements OnInit {
  clientKey = '';
  secretKey = '';
  showSecret = false;
  isLoading = true;
  error: string | null = null;

  constructor(private stripeService: StripeService) {}

  ngOnInit(): void {
    this.loadStripeKeys();
  }

  private loadStripeKeys(): void {
    this.isLoading = true;
    this.error = null;

    this.stripeService.getStripeKeys().subscribe({
      next: (keys) => {
        this.clientKey = keys.clientKey;
        this.secretKey = keys.secretKey;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading Stripe keys:', error);
        this.error = 'Failed to load API keys. Please try again.';
        this.isLoading = false;
      }
    });
  }

  get maskedClientKey(): string {
    return this.maskKey(this.clientKey, 8);
  }

  get displayedSecretKey(): string {
    return this.showSecret ? this.secretKey : this.maskKey(this.secretKey, 8);
  }

  copy(value: string): void {
    navigator.clipboard?.writeText(value);
  }

  toggleSecret(): void {
    this.showSecret = !this.showSecret;
  }

  generateNewKey(): void {
    // Call API to generate new key from server
    this.clientKey = this.createRandomKey();
  }

  regenerateSecret(): void {
    // Call API to generate new secret from server
    this.secretKey = this.createRandomKey().toLowerCase();
    this.showSecret = false;
  }

  private createRandomKey(): string {
    return Math.random().toString(36).replace(/[^a-z0-9]+/g, '').slice(2, 26).toUpperCase();
  }

  private maskKey(value: string, visibleCount: number): string {
    const visible = value.slice(0, visibleCount);
    return `${visible}${'*'.repeat(28)}`;
  }
}
