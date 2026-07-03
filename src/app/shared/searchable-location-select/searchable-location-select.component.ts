import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FeatherModule } from 'angular-feather';

export interface SearchableLocationOption {
  value: string;
  label: string;
  category: string;
  meta?: string;
}

export interface LocationAddRequest {
  category: string;
  locationName: string;
  googleMapsLink: string;
}

@Component({
  selector: 'app-searchable-location-select',
  standalone: true,
  imports: [CommonModule, FormsModule, FeatherModule],
  templateUrl: './searchable-location-select.component.html',
  styleUrls: ['./searchable-location-select.component.scss']
})
export class SearchableLocationSelectComponent {
  @Input() options: SearchableLocationOption[] = [];
  @Input() disabledValues: string[] = [];
  @Input() placeholder = 'Select location';
  @Input() value = '';
  @Output() valueChange = new EventEmitter<string>();
  @Output() locationAddRequest = new EventEmitter<LocationAddRequest>();

  isOpen = false;
  search = '';
  showAddLocationForm = false;
  isSubmittingRequest = false;
  requestFormData = {
    category: '',
    locationName: '',
    googleMapsLink: ''
  };

  get availableCategories(): string[] {
    const categories = new Set(this.options.map(opt => opt.category));
    return Array.from(categories).sort();
  }

  get isRequestFormValid(): boolean {
    return Boolean(
      this.requestFormData.category.trim() &&
      this.requestFormData.locationName.trim() &&
      this.requestFormData.googleMapsLink.trim()
    );
  }

  get selectedLabel(): string {
    return this.options.find(option => option.value === this.value)?.label || '';
  }

  get filteredOptions(): SearchableLocationOption[] {
    const query = this.search.trim().toLowerCase();

    if (!query) {
      return this.options;
    }

    return this.options.filter(option =>
      `${option.label} ${option.category}`.toLowerCase().includes(query)
    );
  }

  get groupedOptions(): Array<{ category: string; options: SearchableLocationOption[] }> {
    const groups = new Map<string, SearchableLocationOption[]>();

    this.filteredOptions.forEach(option => {
      groups.set(option.category, [...(groups.get(option.category) || []), option]);
    });

    return Array.from(groups, ([category, options]) => ({ category, options }));
  }

  toggle(): void {
    this.isOpen = !this.isOpen;
    this.search = '';
    if (!this.isOpen) {
      this.showAddLocationForm = false;
    }
  }

  select(option: SearchableLocationOption): void {
    if (this.disabledValues.includes(option.value)) {
      return;
    }

    this.value = option.value;
    this.valueChange.emit(option.value);
    this.isOpen = false;
    this.search = '';
    this.showAddLocationForm = false;
  }

  toggleAddLocationForm(): void {
    this.showAddLocationForm = !this.showAddLocationForm;
    if (this.showAddLocationForm) {
      this.resetRequestForm();
    }
  }

  submitLocationRequest(): void {
    if (!this.validateRequestForm()) {
      return;
    }

    this.isSubmittingRequest = true;
    const request: LocationAddRequest = {
      category: this.requestFormData.category,
      locationName: this.requestFormData.locationName.trim(),
      googleMapsLink: this.requestFormData.googleMapsLink.trim()
    };

    this.locationAddRequest.emit(request);

    // Reset form after short delay for UX
    setTimeout(() => {
      this.isSubmittingRequest = false;
      this.resetRequestForm();
      this.showAddLocationForm = false;
    }, 500);
  }

  private validateRequestForm(): boolean {
    return Boolean(
      this.requestFormData.category.trim() &&
      this.requestFormData.locationName.trim() &&
      this.requestFormData.googleMapsLink.trim()
    );
  }

  private resetRequestForm(): void {
    this.requestFormData = {
      category: '',
      locationName: '',
      googleMapsLink: ''
    };
  }
}

