import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { RenterBooking } from '../../models/renter-journey.models';
import { RenterJourneyService } from '../../services/renter-journey.service';
import { RenterPageShellComponent } from '../shared/renter-page-shell/renter-page-shell.component';
@Component({ selector: 'app-booking-details', standalone: true, imports: [CommonModule, RouterLink, RenterPageShellComponent], templateUrl: './booking-details.component.html' })
export class BookingDetailsComponent implements OnInit { booking: RenterBooking | null = null; isLoading = true; constructor(private readonly route: ActivatedRoute, private readonly journeyService: RenterJourneyService) {} ngOnInit(): void { this.journeyService.getBooking(this.route.snapshot.paramMap.get('reference') || '').subscribe(item => { this.booking = item; this.isLoading = false; }); } }