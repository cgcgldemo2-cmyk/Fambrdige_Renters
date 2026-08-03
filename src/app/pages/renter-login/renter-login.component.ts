import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { finalize } from 'rxjs';
import { RenterAuthService } from '../../services/renter-auth.service';

@Component({
  selector: 'app-renter-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './renter-login.component.html',
  styleUrls: ['./renter-login.component.scss']
})
export class RenterLoginComponent {
  readonly form;
  isSubmitting = false;
  showPassword = false;
  errorMessage = '';

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly renterAuthService: RenterAuthService,
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) {
    this.form = this.formBuilder.nonNullable.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  submit(): void {
    this.errorMessage = '';
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    this.renterAuthService.login(this.form.getRawValue()).pipe(
      finalize(() => this.isSubmitting = false)
    ).subscribe(result => {
      if (!result.success) {
        this.errorMessage = result.message;
        return;
      }

      const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
      this.router.navigateByUrl(returnUrl?.startsWith('/') ? returnUrl : '/');
    });
  }

  hasError(controlName: 'email' | 'password', errorName?: string): boolean {
    const control = this.form.controls[controlName];
    return control.touched && (errorName ? control.hasError(errorName) : control.invalid);
  }
}
