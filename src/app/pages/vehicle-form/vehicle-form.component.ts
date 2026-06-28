import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LessorSidebarComponent } from '../../shared/components/lessor-sidebar/lessor-sidebar.component';

interface InsuranceCoverage {
  label: string;
  value: string;
  selected: boolean;
}

@Component({
  selector: 'app-vehicle-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    LessorSidebarComponent
  ],
  templateUrl: './vehicle-form.component.html',
  styleUrls: ['./vehicle-form.component.scss']
})
export class VehicleFormComponent {
  isEditMode = false;
  isSaving = false;

  vehicle = {
    name: '',
    carType: '',
    rentalType: 'with_driver',
    seats: '',
    transmission: '',
    fuelType: '',
    plateNumber: '',
    motorVehicleFileNumber: '',
    color: '',
    pickupAddress: '',
    dailyRate: 0,
    twelveHourRate: 0,
    withDriverAddOn: 0,
    status: 'active',
    isAvailable: true,
    description: ''
  };

  carTypes = ['Sedan', 'SUV', 'MPV', 'Van', 'Pickup'];
  transmissionOptions = ['Automatic', 'Manual'];
  fuelTypes = ['Gasoline', 'Diesel', 'Hybrid', 'Electric'];
  statusOptions = [
    { label: 'Active', value: 'active' },
    { label: 'Inactive', value: 'inactive' },
    { label: 'Under Review', value: 'under_review' }
  ];

  insuranceCoverages: InsuranceCoverage[] = [
    {
      label: 'Comprehensive Insurance',
      value: 'comprehensive',
      selected: false
    },
    {
      label: 'Personal Accident Coverage',
      value: 'personal_accident',
      selected: false
    },
    {
      label: 'Third Party Liability Coverage',
      value: 'third_party_liability',
      selected: false
    },
    {
      label: 'Acts of Nature Coverage',
      value: 'acts_of_nature',
      selected: false
    }
  ];

  selectedImagePreview = '';
  orcrFileName = '';
  insuranceFileName = '';

  onImageSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (!file) {
      return;
    }

    this.selectedImagePreview = URL.createObjectURL(file);
  }

  onOrCrSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.orcrFileName = input.files?.[0]?.name || '';
  }

  onInsuranceSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.insuranceFileName = input.files?.[0]?.name || '';
  }

  saveVehicle(): void {
    this.isSaving = true;

    const selectedCoverages = this.insuranceCoverages
      .filter(item => item.selected)
      .map(item => item.value);

    console.log('Save vehicle', {
      vehicle: this.vehicle,
      selectedCoverages
    });

    setTimeout(() => {
      this.isSaving = false;
    }, 800);
  }
}
