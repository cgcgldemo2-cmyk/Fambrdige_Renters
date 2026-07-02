import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

interface CityApplication {
  city: string;
  count: number;
}

@Component({
  selector: 'app-top-cities-by-applications',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './top-cities-by-applications.component.html',
  styleUrls: ['./top-cities-by-applications.component.scss']
})
export class TopCitiesByApplicationsComponent {
  cities: CityApplication[] = [
    { city: 'Manila', count: 1062 },
    { city: 'Cebu', count: 726 },
    { city: 'Davao', count: 618 },
    { city: 'Baguio', count: 342 },
    { city: 'Iloilo', count: 284 }
  ];

  maxCount = Math.max(...this.cities.map(city => city.count));

  getBarHeight(count: number): string {
    return `${Math.max((count / this.maxCount) * 100, 12)}%`;
  }
}
