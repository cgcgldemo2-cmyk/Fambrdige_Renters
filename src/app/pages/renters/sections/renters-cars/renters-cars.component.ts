import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({ selector: 'app-renters-cars', standalone: true, imports: [CommonModule, RouterLink], templateUrl: './renters-cars.component.html', styleUrls: ['./renters-cars.component.scss'] })
export class RentersCarsComponent {
  @Input() cars: any[] = [];
  currentIndex = 0;
  get visibleCars() { return this.cars.slice(this.currentIndex, this.currentIndex + 4); }
  get dots() { return Array.from({ length: Math.max(this.cars.length - 3, 1) }); }
  next(): void { if (this.currentIndex < this.cars.length - 4) this.currentIndex++; }
  prev(): void { if (this.currentIndex > 0) this.currentIndex--; }
  goTo(index: number): void { this.currentIndex = index; }
}
