import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { finalize } from 'rxjs';
import { RenterProfile } from '../../models/renter-journey.models';
import { RenterJourneyService } from '../../services/renter-journey.service';
import { RenterPageShellComponent } from '../shared/renter-page-shell/renter-page-shell.component';

@Component({ selector: 'app-renter-profile', standalone: true, imports: [CommonModule, ReactiveFormsModule, RenterPageShellComponent], templateUrl: './renter-profile.component.html' })
export class RenterProfileComponent implements OnInit {
  readonly form;
  profile: RenterProfile | null = null;
  isLoading = true;
  isEditing = false;
  isSaving = false;
  successMessage = '';
  errorMessage = '';

  constructor(private readonly formBuilder: FormBuilder, private readonly journeyService: RenterJourneyService) {
    this.form = this.formBuilder.nonNullable.group({
      fullName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required, Validators.minLength(10)]],
      address: ['', Validators.maxLength(250)]
    });
  }

  ngOnInit(): void { this.load(); }
  get initials(): string { return (this.profile?.fullName || 'Renter').split(/\s+/).slice(0, 2).map(part => part[0]).join('').toUpperCase(); }

  load(): void {
    this.isLoading = true;
    this.errorMessage = '';
    this.journeyService.getProfile().subscribe({
      next: profile => { this.profile = profile; this.form.patchValue(profile); this.form.disable(); this.isLoading = false; },
      error: () => { this.errorMessage = 'Profile information could not be loaded.'; this.isLoading = false; }
    });
  }

  edit(): void { this.isEditing = true; this.successMessage = ''; this.form.enable(); }
  cancel(): void { if (this.profile) this.form.patchValue(this.profile); this.form.disable(); this.isEditing = false; }

  save(): void {
    if (this.form.invalid || !this.profile) { this.form.markAllAsTouched(); return; }
    this.isSaving = true;
    this.successMessage = '';
    this.errorMessage = '';
    const profile = { ...this.profile, ...this.form.getRawValue() };
    this.journeyService.updateProfile(profile).pipe(finalize(() => this.isSaving = false)).subscribe({
      next: result => { this.profile = profile; this.successMessage = result.message; this.isEditing = false; this.form.disable(); },
      error: () => this.errorMessage = 'Profile changes could not be saved.'
    });
  }
}