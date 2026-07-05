import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-renters-cta',
  standalone: true,
  templateUrl: './renters-cta.component.html',
  styleUrls: ['./renters-cta.component.scss']
})
export class RentersCtaComponent {
  @Input() store: any;

  get ctaBackground(): string {
    return `
      linear-gradient(90deg, rgba(0, 22, 33, 0.95), rgba(0, 22, 33, 0.4)),
      url('${this.store?.ctaImage}')
    `;
  }
}
