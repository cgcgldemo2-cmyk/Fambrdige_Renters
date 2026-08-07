import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { RenterVehicleSelection } from '../../models/renter-journey.models';
import { RenterJourneyService } from '../../services/renter-journey.service';
import { RenterPageShellComponent } from '../shared/renter-page-shell/renter-page-shell.component';

@Component({
  selector: 'app-vehicle-details', standalone: true,
  imports: [CommonModule, RouterLink, RenterPageShellComponent],
  templateUrl: './vehicle-details.component.html'
})
export class VehicleDetailsComponent implements OnInit {
  selection: RenterVehicleSelection | null = null;
  isLoading = true;
  errorMessage = '';

  constructor(private readonly route: ActivatedRoute, private readonly journeyService: RenterJourneyService) {}

  ngOnInit(): void { this.load(); }

  load(): void {
    const vehicleId = Number(this.route.snapshot.paramMap.get('id'));
    this.isLoading = true;
    this.errorMessage = '';
    this.journeyService.getVehicleSelection(vehicleId).subscribe(selection => {
      this.selection = selection;
      this.isLoading = false;
      if (!selection) this.errorMessage = 'Vehicle details are no longer available. Return to Available Cars and select the vehicle again.';
    });
  }
}