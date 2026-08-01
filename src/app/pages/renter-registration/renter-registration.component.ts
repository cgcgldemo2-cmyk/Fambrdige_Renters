import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { finalize } from 'rxjs';
import { RenterAuthService } from '../../services/renter-auth.service';

@Component({
  selector: 'app-renter-registration',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './renter-registration.component.html',
  styleUrls: ['./renter-registration.component.scss']
})
export class RenterRegistrationComponent {
  readonly form;
  isSubmitting = false;
  successMessage = '';
  errorMessage = '';

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly renterAuthService: RenterAuthService
  ) {
    this.form = this.formBuilder.nonNullable.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required, Validators.pattern(/^(?:(?:\+?63|0)?9\d{9})$/)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      passwordConfirmation: ['', [Validators.required]]
    });
  }

  submit(): void {
    this.successMessage = '';
    this.errorMessage = '';

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const value = this.form.getRawValue();
    if (value.password !== value.passwordConfirmation) {
      this.form.controls.passwordConfirmation.setErrors({ passwordMismatch: true });
      return;
    }

    this.isSubmitting = true;
    this.renterAuthService.register({
      name: value.name,
      email: value.email,
      mobile: value.mobile,
      password: value.password
    }).pipe(
      finalize(() => this.isSubmitting = false)
    ).subscribe(result => {
      if (!result.success) {
        this.errorMessage = result.message;
        return;
      }

      this.successMessage = result.message;
      this.form.reset();
    });
  }

  hasError(controlName: keyof typeof this.form.controls, errorName?: string): boolean {
    const control = this.form.controls[controlName];
    return control.touched && (errorName ? control.hasError(errorName) : control.invalid);
  }
}
