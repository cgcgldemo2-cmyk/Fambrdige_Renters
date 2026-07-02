import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

interface VehicleBookingStat {
  type: string;
  bookings: number;
  percent: number;
}

@Component({
  selector: 'app-top-vehicles-by-booking',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './top-vehicles-by-booking.component.html',
  styleUrls: ['./top-vehicles-by-booking.component.scss']
})
export class TopVehiclesByBookingComponent {
  vehicles: VehicleBookingStat[] = [
    { type: 'SUV', bookings: 928, percent: 100 },
    { type: 'Sedan', bookings: 746, percent: 80 },
    { type: 'Van', bookings: 432, percent: 47 },
    { type: 'Pickup', bookings: 188, percent: 20 },
    { type: 'Hatchback', bookings: 122, percent: 13 }
  ];
}
