import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { finalize } from 'rxjs';
import { RenterJourneyService } from '../../services/renter-journey.service';
import { RenterPageShellComponent } from '../shared/renter-page-shell/renter-page-shell.component';

@Component({ selector: 'app-change-password', standalone: true, imports: [CommonModule, ReactiveFormsModule, RenterPageShellComponent], templateUrl: './change-password.component.html' })
export class ChangePasswordComponent {
  readonly form;
  showCurrent = false;
  showNew = false;
  showConfirm = false;
  isSubmitting = false;
  successMessage = '';
  errorMessage = '';

  constructor(private readonly formBuilder: FormBuilder, private readonly journeyService: RenterJourneyService) {
    this.form = this.formBuilder.nonNullable.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d).+$/)]],
      confirmPassword: ['', Validators.required]
    });
  }

  submit(): void {
    this.successMessage = '';
    this.errorMessage = '';
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    const value = this.form.getRawValue();
    if (value.newPassword === value.currentPassword) { this.errorMessage = 'New password must be different from the current password.'; return; }
    if (value.newPassword !== value.confirmPassword) { this.form.controls.confirmPassword.setErrors({ mismatch: true }); return; }
    this.isSubmitting = true;
    this.journeyService.changePassword({ currentPassword: value.currentPassword, newPassword: value.newPassword })
      .pipe(finalize(() => this.isSubmitting = false)).subscribe({
        next: result => { this.successMessage = result.message; this.form.reset(); },
        error: () => this.errorMessage = 'Password could not be changed.'
      });
  }
}