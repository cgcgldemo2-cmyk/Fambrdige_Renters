import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

interface LocationStat {
  name: string;
  count: number;
  percent: number;
}

@Component({
  selector: 'app-top-booking-locations',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './top-booking-locations.component.html',
  styleUrls: ['./top-booking-locations.component.scss']
})
export class TopBookingLocationsComponent {
  locations: LocationStat[] = [
    { name: 'Metro Manila', count: 1086, percent: 100 },
    { name: 'Cebu', count: 742, percent: 68 },
    { name: 'Davao', count: 386, percent: 36 },
    { name: 'Baguio', count: 212, percent: 20 },
    { name: 'Iloilo', count: 168, percent: 15 }
  ];
}
