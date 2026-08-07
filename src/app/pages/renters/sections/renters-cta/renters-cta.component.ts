import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({ selector: 'app-renters-cta', standalone: true, imports: [CommonModule, RouterLink], templateUrl: './renters-cta.component.html', styleUrls: ['./renters-cta.component.scss'] })
export class RentersCtaComponent {
  @Input() store: any;
  get ctaBackground(): string { return `linear-gradient(90deg, rgba(0,22,33,.95), rgba(0,22,33,.4)), url('${this.store?.ctaImage}')`; }
}
