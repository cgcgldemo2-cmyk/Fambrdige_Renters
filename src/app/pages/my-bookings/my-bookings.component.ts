import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { RenterBooking } from '../../models/renter-journey.models';
import { RenterJourneyService } from '../../services/renter-journey.service';
import { RenterPageShellComponent } from '../shared/renter-page-shell/renter-page-shell.component';

@Component({ selector: 'app-my-bookings', standalone: true, imports: [CommonModule, FormsModule, RouterLink, RenterPageShellComponent], templateUrl: './my-bookings.component.html' })
export class MyBookingsComponent implements OnInit {
  bookings: RenterBooking[] = [];
  filter = 'All';
  isLoading = true;
  errorMessage = '';
  constructor(private readonly journeyService: RenterJourneyService) {}
  ngOnInit(): void { this.load(); }
  get filteredBookings(): RenterBooking[] { if (this.filter === 'All') return this.bookings; if (this.filter === 'Active') return this.bookings.filter(item => ['Pending Lessor Approval', 'Approved'].includes(item.status)); return this.bookings.filter(item => item.status === this.filter); }
  load(): void { this.isLoading = true; this.errorMessage = ''; this.journeyService.getBookings().subscribe({ next: items => { this.bookings = items; this.isLoading = false; }, error: () => { this.errorMessage = 'Bookings could not be loaded.'; this.isLoading = false; } }); }
}