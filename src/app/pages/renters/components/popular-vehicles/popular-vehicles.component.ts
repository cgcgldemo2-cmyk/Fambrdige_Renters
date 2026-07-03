import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RenterVehicle } from '../../models/renter-page.models';

@Component({
  selector: 'app-popular-vehicles',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './popular-vehicles.component.html',
  styleUrls: ['./popular-vehicles.component.scss']
})
export class PopularVehiclesComponent {
  @Input() vehicles: RenterVehicle[] = [];
  @Input() title = 'Popular vehicles';
  @Output() bookNow = new EventEmitter<RenterVehicle>();
}
