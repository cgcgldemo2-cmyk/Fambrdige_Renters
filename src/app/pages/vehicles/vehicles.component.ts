import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LessorSidebarComponent } from '../../shared/components/lessor-sidebar/lessor-sidebar.component';
import { FormsModule } from '@angular/forms';

type VehicleStatus = 'Active' | 'Inactive' | 'Under Review';
type InsuranceStatus = 'Complete' | 'Missing' | 'Expiring Soon';

interface Vehicle {
  id: number;
  name: string;
  carType: string;
  rentalType: 'With Driver' | 'Without Driver' | 'Both';
  seats: number;
  transmission: string;
  fuelType: string;
  plateNumber: string;
  location: string;
  pricePerDay: number;
  status: VehicleStatus;
  insuranceStatus: InsuranceStatus;
  isAvailable: boolean;
  imageUrl?: string;
}

@Component({
  selector: 'app-vehicles',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    LessorSidebarComponent
  ],
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.scss']
})
export class VehiclesComponent {
  searchText = '';
  selectedStatus = 'All';
  selectedCarType = 'All';

  statusOptions = ['All', 'Active', 'Inactive', 'Under Review'];
  carTypeOptions = ['All', 'Sedan', 'SUV', 'Van', 'Pickup', 'MPV'];

  vehicles: Vehicle[] = [
    {
      id: 1,
      name: 'Ford Everest Titanium',
      carType: 'SUV',
      rentalType: 'With Driver',
      seats: 7,
      transmission: 'Automatic',
      fuelType: 'Diesel',
      plateNumber: 'ABC 1234',
      location: 'Puerto Princesa Airport',
      pricePerDay: 4500,
      status: 'Active',
      insuranceStatus: 'Complete',
      isAvailable: true,
      imageUrl: 'assets/images/renter-gate/hero-vehicle-suv.png'
    },
    {
      id: 2,
      name: 'Toyota Vios',
      carType: 'Sedan',
      rentalType: 'Without Driver',
      seats: 5,
      transmission: 'Automatic',
      fuelType: 'Gasoline',
      plateNumber: 'XYZ 5678',
      location: 'SM Puerto Princesa',
      pricePerDay: 2300,
      status: 'Active',
      insuranceStatus: 'Expiring Soon',
      isAvailable: true
    },
    {
      id: 3,
      name: 'Toyota Hiace Grandia',
      carType: 'Van',
      rentalType: 'With Driver',
      seats: 12,
      transmission: 'Manual',
      fuelType: 'Diesel',
      plateNumber: 'VAN 2026',
      location: 'El Nido Terminal',
      pricePerDay: 6200,
      status: 'Under Review',
      insuranceStatus: 'Missing',
      isAvailable: false
    }
  ];

  get filteredVehicles(): Vehicle[] {
    const keyword = this.searchText.toLowerCase().trim();

    return this.vehicles.filter(vehicle => {
      const matchSearch =
        !keyword ||
        vehicle.name.toLowerCase().includes(keyword) ||
        vehicle.plateNumber.toLowerCase().includes(keyword) ||
        vehicle.location.toLowerCase().includes(keyword);

      const matchStatus =
        this.selectedStatus === 'All' ||
        vehicle.status === this.selectedStatus;

      const matchType =
        this.selectedCarType === 'All' ||
        vehicle.carType === this.selectedCarType;

      return matchSearch && matchStatus && matchType;
    });
  }

  get activeVehicles(): number {
    return this.vehicles.filter(vehicle => vehicle.status === 'Active').length;
  }

  get underReviewVehicles(): number {
    return this.vehicles.filter(vehicle => vehicle.status === 'Under Review').length;
  }

  get availableVehicles(): number {
    return this.vehicles.filter(vehicle => vehicle.isAvailable).length;
  }

  get missingInsurance(): number {
    return this.vehicles.filter(vehicle => vehicle.insuranceStatus === 'Missing').length;
  }
}
