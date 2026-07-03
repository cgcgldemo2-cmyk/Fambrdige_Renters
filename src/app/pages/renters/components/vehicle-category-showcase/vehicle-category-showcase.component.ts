import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { VehicleCategory } from '../../models/renter-page.models';

@Component({
  selector: 'app-vehicle-category-showcase',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vehicle-category-showcase.component.html',
  styleUrls: ['./vehicle-category-showcase.component.scss']
})
export class VehicleCategoryShowcaseComponent {
  @Input() categories: VehicleCategory[] = [];
  @Output() categorySelected = new EventEmitter<VehicleCategory>();
}
