import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-business-branding',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './business-branding.component.html',
  styleUrls: ['./business-branding.component.scss']
})
export class BusinessBrandingComponent {
  logoPreviewUrl = '';
  selectedLogoName = '';

  onLogoSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (!file) {
      return;
    }

    if (!['image/png', 'image/jpeg', 'image/webp'].includes(file.type)) {
      alert('Please upload PNG, JPG, or WEBP only.');
      input.value = '';
      return;
    }

    this.selectedLogoName = file.name;
    this.logoPreviewUrl = URL.createObjectURL(file);
  }
}
