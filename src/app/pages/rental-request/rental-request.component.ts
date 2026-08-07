import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { finalize, forkJoin } from 'rxjs';
import { RenterProfile, RenterVehicleSelection } from '../../models/renter-journey.models';
import { RenterJourneyService } from '../../services/renter-journey.service';
import { RenterPageShellComponent } from '../shared/renter-page-shell/renter-page-shell.component';

@Component({
  selector: 'app-rental-request', standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, RenterPageShellComponent],
  templateUrl: './rental-request.component.html'
})
export class RentalRequestComponent implements OnInit {
  readonly form;
  selection: RenterVehicleSelection | null = null;
  profile: RenterProfile | null = null;
  isLoading = true;
  isSubmitting = false;
  errorMessage = '';

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly journeyService: RenterJourneyService
  ) {
    this.form = this.formBuilder.nonNullable.group({
      fullName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required, Validators.minLength(10)]],
      notes: ['', Validators.maxLength(500)],
      confirmed: [false, Validators.requiredTrue]
    });
  }

  ngOnInit(): void {
    const vehicleId = Number(this.route.snapshot.paramMap.get('id'));
    forkJoin({ selection: this.journeyService.getVehicleSelection(vehicleId), profile: this.journeyService.getProfile() })
      .subscribe(({ selection, profile }) => {
        this.selection = selection;
        this.profile = profile;
        this.isLoading = false;
        this.form.patchValue({ fullName: profile.fullName, email: profile.email, mobile: profile.mobile });
        if (!selection) this.errorMessage = 'The selected vehicle and schedule could not be restored. Please search again.';
      });
  }

  submit(): void {
    this.errorMessage = '';
    if (this.form.invalid || !this.selection) {
      this.form.markAllAsTouched();
      if (!this.selection) this.errorMessage = 'Select a vehicle before submitting a rental request.';
      return;
    }
    this.isSubmitting = true;
    const value = this.form.getRawValue();
    this.journeyService.submitRentalRequest({
      selection: this.selection,
      renter: { fullName: value.fullName, email: value.email, mobile: value.mobile },
      notes: value.notes
    }).pipe(finalize(() => this.isSubmitting = false)).subscribe({
      next: booking => this.router.navigate(['/booking-confirmation', booking.reference]),
      error: () => this.errorMessage = 'The rental request could not be prepared. Please try again.'
    });
  }

  invalid(name: keyof typeof this.form.controls): boolean {
    const control = this.form.controls[name];
    return control.touched && control.invalid;
  }
}